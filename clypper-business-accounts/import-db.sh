#!/bin/bash

wp-env run cli wp db reset --yes
wp-env run cli wp db import wp-content/trekantenstrailercenterdk.sql
wp-env run cli wp search-replace 'trekantens-trailercenter.dk' 'localhost:8888' --all-tables
wp-env run cli wp search-replace 'www.' '' --all-tables
wp-env run cli wp rewrite flush
wp-env run cli wp cache flush