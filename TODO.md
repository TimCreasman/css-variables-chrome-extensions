# Roadmap

* Monkeytype-like palette selector that auto-applies a theme
* Auto-contrast calculation for determining if everything is visible in the new theme

## The Algorithm

* Extract all css color rules and color variables from a site (run once per domain)
  * Corse pass through all domain css sources, any file with either color or background-color AND either #color or rgb color is passed through
  * Fine pass that sifts through the above files and pulls out arrays of variables and query-selectors to create a style map
* Using palette dynamically generate css that does a "best fit" for the chosen palette

* Auto-contrast calculation for determining if everything is visible in the new theme?
* Produced css should be cached for easy access when refreshing pages

Once cached, we shouldn't need to run the algo again riiiight? 

# TODO

* Implement basic color algo for Solarzied theme (should be extensible to other themes)



# In Progress


