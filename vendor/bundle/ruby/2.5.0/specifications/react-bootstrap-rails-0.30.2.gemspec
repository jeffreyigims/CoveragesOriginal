# -*- encoding: utf-8 -*-
# stub: react-bootstrap-rails 0.30.2 ruby lib

Gem::Specification.new do |s|
  s.name = "react-bootstrap-rails".freeze
  s.version = "0.30.2"

  s.required_rubygems_version = Gem::Requirement.new(">= 0".freeze) if s.respond_to? :required_rubygems_version=
  s.require_paths = ["lib".freeze]
  s.authors = ["Mario Peixoto".freeze]
  s.date = "2016-08-19"
  s.description = "ReactBootstrap for Rails Asset Pipeline".freeze
  s.email = ["mario.peixoto@gmail.com".freeze]
  s.homepage = "https://github.com/mariopeixoto/react-bootstrap-rails".freeze
  s.licenses = ["MIT".freeze]
  s.rubygems_version = "3.0.6".freeze
  s.summary = "A gem for distribution of ReactBootstrap for rails".freeze

  s.installed_by_version = "3.0.6" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 4

    if Gem::Version.new(Gem::VERSION) >= Gem::Version.new('1.2.0') then
      s.add_development_dependency(%q<bundler>.freeze, ["~> 1.7"])
      s.add_development_dependency(%q<rake>.freeze, ["~> 10.0"])
      s.add_runtime_dependency(%q<rails>.freeze, [">= 3.1"])
    else
      s.add_dependency(%q<bundler>.freeze, ["~> 1.7"])
      s.add_dependency(%q<rake>.freeze, ["~> 10.0"])
      s.add_dependency(%q<rails>.freeze, [">= 3.1"])
    end
  else
    s.add_dependency(%q<bundler>.freeze, ["~> 1.7"])
    s.add_dependency(%q<rake>.freeze, ["~> 10.0"])
    s.add_dependency(%q<rails>.freeze, [">= 3.1"])
  end
end
