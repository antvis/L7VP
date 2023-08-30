import io
import os
import sys
from shutil import rmtree
from setuptools import Command, find_packages, setup


def read(*names, **kwargs):
    return io.open(
        os.path.join(os.path.dirname(__file__), *names),
        encoding=kwargs.get("encoding", "utf8")
    ).read()

# RELEASE STEPS
# python setup.py upload


__title__ = "pyl7vp"
__description__ = "Python3 binding for @AntV/L7VP geospatial visual analysis tool."
__long_description__ = read('README.md')
__url__ = "https://github.com/antvis/L7VP/bindings/pyl7vp"
__author_email__ = "yunji.me@outlook.com"
__license__ = "Apache-2.0"

__requires__ = ["jinja2>=3.0.0", "simplejson"]
__extra_requires__ = {}

__keywords__ = ["AntV", "L7VP", "PyL7VP",
                "visualization", "map", "geospatial visualization", "geospatial analysis"]

# Load the package's _version.py module as a dictionary.
here = os.path.abspath(os.path.dirname(__file__))
meta = {}
with open(os.path.join(here, __title__, "meta.py")) as f:
    exec(f.read(), meta)

__version__ = meta["__version__"]
__author__ = meta["__author__"]


class UploadCommand(Command):
    description = "Build and publish the package."
    user_options = []

    @staticmethod
    def status(s):
        print("✨✨ {0}".format(s))

    def initialize_options(self):
        pass

    def finalize_options(self):
        pass

    def run(self):
        try:
            self.status("Removing previous builds…")
            rmtree(os.path.join(here, "dist"))
            rmtree(os.path.join(here, "build"))
            rmtree(os.path.join(here, "{0}.egg-info".format(__title__)))
        except OSError:
            pass

        self.status("Building Source and Wheel distribution…")
        os.system("{0} setup.py bdist_wheel sdist".format(sys.executable))

        self.status("Uploading the package to PyPI via Twine…")
        os.system("python -m twine upload dist/*")

        sys.exit()


setup(
    name=__title__,
    version=__version__,
    description=__description__,
    long_description=__long_description__,
    long_description_content_type="text/markdown",
    url=__url__,
    author=__author__,
    author_email=__author_email__,
    license=__license__,
    packages=find_packages(exclude=("tests",)),
    keywords=__keywords__,
    install_requires=__requires__,
    zip_safe=False,
    include_package_data=True,
    classifiers=[
        "Environment :: Console",
        "Intended Audience :: Developers",
        "License :: OSI Approved :: Apache Software License",
        "Operating System :: OS Independent",
        "Programming Language :: Python",
        "Programming Language :: Python :: 3",
        "Programming Language :: Python :: 3.7",
        "Programming Language :: Python :: 3.8",
        "Programming Language :: Python :: 3.9",
        "Topic :: Software Development :: Libraries",
    ],
    cmdclass={"upload": UploadCommand},
    extras_require=__extra_requires__,
)
