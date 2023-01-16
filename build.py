# Import modules
import os

import pyinotify

# Init variables
paths = {
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
            "app.js"
        ],
    },
}

def buildScripts(paths):
    """Merge together given scripts
    
    paths
        A dictionary of paths
    """
    
    # Init variables
    src_filenames = [os.path.join(paths["root"], f) for f in paths["sources"]]
    dest_filename = os.path.join(paths["root"], paths["destination"])
    scripts = ""

    # Merge scipts
    for src_filename in src_filenames:
        with open(src_filename, "r") as file:
            scripts += file.read()
    with open(dest_filename, "w") as file:
        file.write(scripts)

    # Print results
    print("Scripts are built sucessfully.")


def buildStyles(paths):
    """Build CSS from given SCSS files
    
    paths
        A dictionary of paths
    """

    src_filename = os.path.abspath(os.path.join(paths["root"], paths["source"]))
    dest_filename = os.path.abspath(os.path.join(paths["root"], paths["destination"]))
    os.system("sass {0} {1} --style=compressed --no-source-map".format(src_filename, dest_filename))

    # Print results
    print("Styles are built sucessfully.")


def watchFiles(paths):
    """Build CSS and JS files on file change
    
    paths
        A dictionary of style and script paths
    """

    class EventProcessor(pyinotify.ProcessEvent):
        def process_IN_CLOSE_WRITE(self, event):
            buildScripts(paths["script"])
            buildStyles(paths["style"])


    # Init variables
    wm = pyinotify.WatchManager()
    en = pyinotify.Notifier(wm, EventProcessor())
    watched = []

    # Set watched script files
    for filename in paths["script"]["sources"]:
        watched.append(os.path.join(paths["script"]["root"], filename))

    # Set watched style files
    style_dir = os.listdir(paths["style"]["root"])
    for filename in style_dir:
        if filename not in [paths["style"]["source"], paths["style"]["destination"]]:
            watched.append(os.path.join(paths["style"]["root"], filename))

    # Watch files
    wm.add_watch(watched, pyinotify.ALL_EVENTS)
    en.loop()


# Build scripts and styles on startup
buildScripts(paths["script"])
buildStyles(paths["style"])
watchFiles(paths)