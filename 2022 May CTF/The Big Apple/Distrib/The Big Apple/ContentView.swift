//
//  ContentView.swift
//  The Big Apple
//
//  Created by Carl Ian Voller on 30/4/22.
//

import SwiftUI

struct ContentView: View {
    
    @StateObject var watchOSModel = ViewModelPhone();
    @State var output = "";
    
    var body: some View {
        ZStack {
            Color.black
            VStack {
                Text("Enter your super secret text on your watchOS companion app!")
                    .padding()
                    .multilineTextAlignment(.center)
                Text("Value received from watch:\n\n\(watchOSModel.message != "" ? watchOSModel.message : "No message has been received!")")
                    .padding()
                    .multilineTextAlignment(.center)
                Text("Value after encoded:")
                    .padding()
                    .multilineTextAlignment(.center)
                OutputFieldView(input: $watchOSModel.message, output: $output)
                    .frame(height: 100)
            }
            .environmentObject(watchOSModel)
        }
        .foregroundColor(Color.white)
        .ignoresSafeArea()
        
        
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
