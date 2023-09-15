#!/bin/bash

cd ./packages/

cd ./li-sdk/
yarn link
cd ..

cd ./li-p2/
yarn link
cd ..

cd ./li-editor/
yarn link
cd ..

cd ./li-core-assets/
yarn link
cd ..

cd ./li-analysis-assets/
yarn link
cd ..
