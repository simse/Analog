import ExpoModulesCore
import ActivityKit

public class SessionActivityModule: Module {
    public func definition() -> ModuleDefinition {
        Name("SessionActivity")
        
        Function("areActivitiesEnabled") { () -> Bool in
            let logger = Logger()
            logger.info("areActivitiesEnabled()")
            
            if #available(iOS 16.2, *) {
                return ActivityAuthorizationInfo().areActivitiesEnabled
            } else {
                return false
            }
        }
        
        Function("startActivity") { (startTimeUnix: UInt64, endTimeUnix: UInt64, title: String, length: Double, progress: Double) -> Bool in
            let logger = Logger()
            logger.info("startActivity()")

            let startTime =  Date(timeIntervalSince1970: TimeInterval(startTimeUnix))
            let endTime =  Date(timeIntervalSince1970: TimeInterval(endTimeUnix))
            
            if #available(iOS 16.2, *) {
                let attributes = SessionAttributes()
                let contentState = SessionAttributes.ContentState(startTime: startTime, endTime: endTime, title: title, length: length, progress: progress)
                
                let activityContent = ActivityContent(state: contentState, staleDate: nil)
                
                do {
                    let activity = try Activity.request(attributes: attributes, content: activityContent)
                    logger.info("Requested a Live Activity \(String(describing: activity.id)).")
                    return true
                } catch (let error) {
                    logger.error("Error requesting Live Activity \(error.localizedDescription).")
                    return false
                }
            } else {
                logger.error("iOS version is lower than 16.2. Live Activity is not available.")
                return false
            }
        }

        Function("endActivity") { (title: String, length: Double, progress: Double) -> Void in
            let logger = Logger()
            logger.info("endActivity()")
            
            if #available(iOS 16.2, *) {
                let contentState = SessionAttributes.ContentState(startTime: .now, endTime: .now, title: title, length: length, progress: progress)
                let finalContent = ActivityContent(state: contentState, staleDate: nil)
                
                Task {
                    for activity in Activity<SessionAttributes>.activities {
                        await activity.end(finalContent, dismissalPolicy: .immediate)
                        logger.info("Ending the Live Activity: \(activity.id)")
                    }
                }
            }
        }
    }
}