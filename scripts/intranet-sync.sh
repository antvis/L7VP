#!/bin/bash

cd ./packages/

cd ./li-sdk/
tnpm sync
cd ..

cd ./li-editor/
tnpm sync
cd ..

cd ./li-core-assets/
tnpm sync
cd ..

cd ./li-analysis-assets/
tnpm sync
cd ..
