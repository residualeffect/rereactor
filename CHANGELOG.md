# Changelog

## [2.0.0] - 2023-05-05
### Updated
* Take advantage of use-sync-external-store shim in useObservable to take advantage of react 18 features and be compatible with older versions of react.  You can use useObservableLegacy to avoid this.
### Fixed
* useObservable was not supplying the unsubscribe cleanup function to React.useLayoutEffect

## [1.1.0] - 2022-09-15
### Fixed
* Detect when an observable value has changed between the time when the useObservable hook was invoked and when the subscription was created, and trigger react as expected

## [1.0.0] - 2022-03-31
### Added
* Initial Release, with support for react 16.8+
