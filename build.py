"""Script for deploying and building styles and scripts"""

# Import modules
import os
import json
import argparse

from fabric import Connection
import jsmin

# Init variables
paths = {
    "root": os.path.dirname(os.path.abspath(__file__)) + "/",
    "sftp_config": "sftp-config.json",
    "style": {
        "root": "assets/css",
        "destination": "app.css",
        "source": "app.scss",
    },
    "script": {
        "root": "assets/js",
        "destination": "scripts.js",
        "sources": [
            "focus-tracker.js",
            "app.js",
        ],
    },
}

def build_scripts(upload):
    """Merge together given scripts"""

    # Init variables
    src_filenames = [os.path.join(paths["script"]["root"], f) for f in paths["script"]["sources"]]
    dest_filename = os.path.join(paths["script"]["root"], paths["script"]["destination"])
    scripts = ""

    # Merge scipts
    for src_filename in src_filenames:
        with open(paths['root'] + src_filename, "r", encoding="utf-8") as file:
            scripts += file.read()
    with open(paths['root'] + dest_filename, "w", encoding="utf-8") as file:
        file.write(jsmin.jsmin(scripts))

    # Print results
    print("Scripts are built sucessfully.")
    if upload and upload_to_server(dest_filename):
        print("Merged script is uploaded to server")


def build_styles(upload):
    """Build CSS from given SCSS files"""

    src_filename = os.path.join(paths["style"]["root"], paths["style"]["source"])
    dest_filename = os.path.join(paths["style"]["root"], paths["style"]["destination"])
    os.system(f"sass {paths['root'] + src_filename} {paths['root'] + dest_filename} --style=compressed --no-source-map")

    # Print results
    print("Styles are built sucessfully.")
    if upload and upload_to_server(dest_filename):
        print("Merged style is uploaded to server")


def upload_to_server(dest_filename):
    """Upload given file to server trough SSH
    
    dest_filename
        Local filename to be uploaded
    """

    # Try to load config file
    config = read_sftp_config()
    if config is None or "remote_path" not in config or "host" not in config:
        return False

    # Upload file to server
    remote_file = os.path.abspath(os.path.join(config["remote_path"], dest_filename))
    with Connection(host=config["host"], user=config["user"]) as conn:
        conn.put(paths['root'] + dest_filename, remote=remote_file)
        return True

    return False


def read_sftp_config():
    """Try to read SSH configuration"""

    # Read file
    filename = paths['root'] + paths["sftp_config"]
    if filename is not None and os.path.isfile(filename):
        with open(filename, "r", encoding="utf-8") as file:
            return json.load(file)

    return None


if __name__ == '__main__':

    # Init parser
    parser = argparse.ArgumentParser(description=__doc__)

    # Parse arguments
    parser.add_argument('-c', '--styles', action='store_true', help='build styles')
    parser.add_argument('-s', '--scripts', action='store_true', help='build scripts')
    parser.add_argument('-u', '--upload', action='store_true', help='upload build trough SSH')
    args = parser.parse_args()

    # Build scripts and styles on startup
    if args.styles:
        build_styles(args.upload)
    if args.scripts:
        build_scripts(args.upload)