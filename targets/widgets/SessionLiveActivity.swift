import ActivityKit
import SwiftUI
import WidgetKit

struct SessionActivityView: View {
    let context: ActivityViewContext<SessionAttributes>
    @Environment(\.colorScheme) var colorScheme

    var body: some View {
        HStack {
          VStack(spacing: 10) {
            HStack {
              Text("Session in Progress")
                .font(.headline)
              Spacer()
            }
            .padding(.top)
            
            HStack {
              Text(context.state.title)
                .font(.title2)
                .padding(.top, 5)
              Spacer()
            }
            
            Spacer()
            
            HStack {
              Text(
                String(format: "%.0f", context.state.progress) + "/" +
                String(format: "%.0f", context.state.length)
              )
              .multilineTextAlignment(.leading)
              .font(.system(size: 14, design: .monospaced))

              
              ProgressView(value: context.state.progress, total: context.state.length)
                .tint(.blue)
                .background(Color.gray)
              
              
            }
                
                Spacer()
            }
            .padding(.horizontal)
        }
    }
}

struct FizlIslandBottom: View {
    let context: ActivityViewContext<SessionAttributes>

    var body: some View {
      HStack {
        Text(context.state.title)
          .font(.title2)
          .padding(.top, 5)
        Spacer()
      }
      
      Spacer()
      
      HStack {
        Text(
          String(format: "%.0f", context.state.progress) + "/" +
          String(format: "%.0f", context.state.length)
        )
        .multilineTextAlignment(.leading)
        .font(.system(size: 14, design: .monospaced))

        
        ProgressView(value: context.state.progress, total: context.state.length)
          .tint(.blue)
          .background(Color.gray)
        
        
      }
    }
}

struct SessionWidget: Widget {
    let kind: String = "Session_Widget"

    var body: some WidgetConfiguration {
        ActivityConfiguration(for: SessionAttributes.self) { context in
          SessionActivityView(context: context)
        } dynamicIsland: { context in
            DynamicIsland {
                DynamicIslandExpandedRegion(.leading) {
                    
                }
                DynamicIslandExpandedRegion(.trailing) {}
                DynamicIslandExpandedRegion(.bottom) {
                    FizlIslandBottom(context: context)
                }
            } compactLeading: {
                Text("Analog")
            } compactTrailing: {} minimal: {
                Image("FizlIconWhite")
                    .resizable()
                    .aspectRatio(contentMode: .fit)
                    .frame(width: 16)
            }
        }
    }
}

private extension SessionAttributes {
    static var preview: SessionAttributes {
      SessionAttributes()
    }
}

private extension SessionAttributes.ContentState {
    static var state: SessionAttributes.ContentState {
      SessionAttributes.ContentState(startTime: Date(timeIntervalSince1970: TimeInterval(1704300710)), endTime: Date(timeIntervalSince1970: TimeInterval(1704304310)), title: "Trip to Clerkenwell", length: 36, progress: 12)
    }
}

struct SessionActivityView_Previews: PreviewProvider {
    static var previews: some View {
        Group {
          SessionAttributes.preview
                .previewContext(SessionAttributes.ContentState.state, viewKind: .content)
                .previewDisplayName("Content View")

          SessionAttributes.preview
                .previewContext(SessionAttributes.ContentState.state, viewKind: .dynamicIsland(.compact))
                .previewDisplayName("Dynamic Island Compact")

          SessionAttributes.preview
                .previewContext(SessionAttributes.ContentState.state, viewKind: .dynamicIsland(.expanded))
                .previewDisplayName("Dynamic Island Expanded")

          SessionAttributes.preview
                .previewContext(SessionAttributes.ContentState.state, viewKind: .dynamicIsland(.minimal))
                .previewDisplayName("Dynamic Island Minimal")
        }
    }
}
