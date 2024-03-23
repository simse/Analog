import ActivityKit
import SwiftUI

struct SessionAttributes: ActivityAttributes {
    public typealias SessionStatus = ContentState
    
    public struct ContentState: Codable, Hashable {
      var startTime: Date
      var endTime: Date
      var title: String
      var length: Double
      var progress: Double
    }
}
