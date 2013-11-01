#!/usr/bin/env ruby
require 'pathname'
dir = (Pathname.pwd + Pathname.new(__FILE__)).dirname

proj_dir = dir + './*'
dist_dir = 'e2f@192.168.8.174:/home/e2f/biz-static/crm-mobile'

exec <<-eos
   
        rsync -ahqzt --delete #{proj_dir} #{dist_dir}
    
eos


