source "https://rubygems.org"
git_source(:github) { |repo| "https://github.com/#{repo}.git" }

ruby "2.5.7"

# Bundle edge Rails instead: gem 'rails', github: 'rails/rails'
gem "rails", "~> 5.2.4", ">= 5.2.4.3"
# Use sqlite3 as the database for Active Record
# gem 'sqlite3'
gem "pg"
# Use Puma as the app server
gem "puma", "~> 4.3"
# Use SCSS for stylesheets
gem "sass-rails", "~> 5.0"
# Use Uglifier as compressor for JavaScript assets
gem "uglifier", ">= 1.3.0"
# See https://github.com/rails/execjs#readme for more supported runtimes
# gem 'mini_racer', platforms: :ruby

# Use CoffeeScript for .coffee assets and views
gem "coffee-rails", "~> 4.2"
# Turbolinks makes navigating your web application faster. Read more: https://github.com/turbolinks/turbolinks
gem "turbolinks", "~> 5"
# Build JSON APIs with ease. Read more: https://github.com/rails/jbuilder
gem "jbuilder", "~> 2.5"
# Use Redis adapter to run Action Cable in production
# gem 'redis', '~> 4.0'
# Use ActiveModel has_secure_password
# gem 'bcrypt', '~> 3.1.7'

# Use ActiveStorage variant
# gem 'mini_magick', '~> 4.8'

# Use Capistrano for deployment
# gem 'capistrano-rails', group: :development

# Reduces boot times through caching; required in config/boot.rb
gem "bootsnap", ">= 1.1.0", require: false

# Other gems
gem "validates_timeliness", "4.0.2"
gem "time_date_helpers", "0.0.4"

group :development, :test do
  # Call 'byebug' anywhere in the code to stop execution and get a debugger console
  gem "byebug", platforms: [:mri, :mingw, :x64_mingw]
  # Adds support for Capybara system testing and webdrivers
  gem "capybara"
  gem "webdrivers"
  gem "better_errors"
  gem "binding_of_caller"
  gem "meta_request"
  gem "hirb"
  gem "faker"
  gem "populator"
  gem "factory_bot_rails"
  gem "simplecov"
  gem "shoulda", "3.5.0"
  gem "shoulda-matchers", "2.8.0"
  gem "minitest-rails", "3.0.0"
  gem "minitest-reporters", "1.1.19"
  gem "rails-controller-testing"
  gem "cucumber-rails", require: false
  gem "database_cleaner"
  gem "launchy"
end

group :development do
  # Access an interactive console on exception pages or by calling 'console' anywhere in the code.
  gem "web-console", ">= 3.3.0"
  gem "listen", ">= 3.0.5", "< 3.2"
  # Spring speeds up development by keeping your application running in the background. Read more: https://github.com/rails/spring
  # gem 'spring'
  # gem 'spring-watcher-listen', '~> 2.0.0'
end

group :test do
  # Adds support for Capybara system testing and selenium driver
  # gem 'capybara', '>= 2.15'
  # gem 'selenium-webdriver'
  # Easy installation and use of chromedriver to run system tests with Chrome
  # gem 'chromedriver-helper'
end

# Windows does not include zoneinfo files, so bundle the tzinfo-data gem
gem "tzinfo-data", platforms: [:mingw, :mswin, :x64_mingw, :jruby]

gem "jquery-rails"
gem 'jquery-ui-rails', '6.0.1'
# gem "popper_js", "~> 1.14.5"
# gem 'bootstrap-sass', '~> 3.4.1'
gem "sassc-rails", ">= 2.1.0"
gem "react-rails"
gem "webpacker"
gem "react-bootstrap-rails", "~> 0.30.2"
gem "bootstrap", "~> 4.4.1"
gem "cancancan"
# Use ActiveModel has_secure_password
gem "bcrypt", "~> 3.1.7"
gem 'jquery-turbolinks'

# gem 'formic'# , '~> 0.2.5'
# gem 'yup', '~> 0.2.1'
# gem 'bdb', '~> 0.2.6.5'
# gem 'bundler', '~> 2.1', '>= 2.1.4'
# gem 'jeweler', '~> 2.3', '>= 2.3.9'
# gem 'minitest', '~> 5.14', '>= 5.14.1'
# gem 'redis-namespace', '~> 1.7'
# gem 'simplecov', '~> 0.18.5'
# gem 'simplecov-rcov', '~> 0.2.3'
# gem 'travis-lint', '~> 2.0'
# gem 'yard', '~> 0.9.25'

# Use Rack CORS for handling Cross-Origin Resource Sharing (CORS), making cross-origin AJAX possible
gem "rack-cors", "1.0.2"
# For serializing models to json for the API
# gem 'active_model_serializers', '0.10.7'
gem "fast_jsonapi", "1.5"
gem 'will_paginate'

source "https://rails-assets.org" do
  gem "rails-assets-react-date-picker"
  gem "rails-assets-moment"
end
