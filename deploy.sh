#!/bin/bash
CURRENT_DIR=.
DEPLOY=$CURRENT_DIR/deploy
rm -rf $DEPLOY
mkdir -p $DEPLOY
mkdir -p $DEPLOY/bin

cp $CURRENT_DIR/build/bin/atnum-content-converter $DEPLOY
cp $CURRENT_DIR/build/native/* $DEPLOY/bin
cp $CURRENT_DIR/build/run.sh $DEPLOY
cp $CURRENT_DIR/install.sh $DEPLOY



