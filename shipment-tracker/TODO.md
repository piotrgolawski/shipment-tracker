# What Could I Do More/Better?

## 1. Many waypoints
It is possible to use many waypoints, however it requires some UI changes, I could add a "chip" each time user fill an waypoint and use drag and drop to position them with effect on the map.

## 2. Truck path
Truck path could be saved and presented, not only current position. That would require a use of different database, fetch mechanism to get previous points and a way of showing it on the road.

## 3. More vehicles/identification of them
Application could show a dropdown list of available trucks/trains in the modal window.

## 4. Styling Improvements
The current styling could be enhanced, elements are positioned in proper way, however application presentation is raw.

## 5. State Management
React Context was used instead of Redux, Redux would be overkill for such a small project, however redux (or any advanced stage management library), could be necessary for bigger apps, providing more possibilities and could be easier to maintain.

## 6. Error Handling
API error responses could be mapped to more human-friendly messages, providing better control over the user experience.
Now only one message is mapped, the one regarding "ZERO_RESULTS" for the path.

## 7. Internationalization (i18n)
All text could be incorporated into an i18n translation mechanism. This would make translations to other languages faster and more error-free.

## 8. Testing
- More unit tests could be added.
- Implementing E2E tests would be highly beneficial, as they mimic user interactions more comprehensively than unit tests.

## 9. Authentication
Backend could use any way of authenticating and authorizing user to use the socket, now everything is permitted.

## 10. Resolve all "deprecated" problems
In some places I am using method which are deprecated, just because it is faster. If it was a real product, I should definitely get rid of those.