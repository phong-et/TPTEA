# Changelog
All notable changes to this project will be documented in this file.

## [Unreleased]
### Added
- Menus Listing after clicking a single Catefory
- Register link at login page
- Stylus all pages & components (maxwidth = $breakpoint-xs quasar's variable)
### Removed 
- Join now button
### Fixed
- createdAt/updatedAt remove default val [#reason](default val is autogen when using upsert/update in sequelize)
- Register layout
- Change style reply botton and font size desc  [@john](https://github.com/tri-et/TPTEA/tree/feature/menu-detail)
- Change wrong routing at news detail page (orders->categories)

## 0.0.1 - 2018-09-17
### Fixed
- Missing images due to improper using of assets images
- Remove dist/ from .gitignore [#reason](in-order to be able to upload to heroku)
### Changed
- Remove pull to refresh
- Use statics assets instead of google drive image download links
### Added
- Customer Login feature
- Customer Register feature
- News & NewsDetail page
- Categories Listing page
- Logins fields validation