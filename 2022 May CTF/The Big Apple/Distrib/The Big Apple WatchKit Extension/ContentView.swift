//
//  ContentView.swift
//  The Big Apple WatchKit Extension
//
//  Created by Carl Ian Voller on 30/4/22.
//

import SwiftUI

struct ContentView: View {
    
    @State var input = ""
    @StateObject var iOSModel = ViewModelWatch()
    
    var body: some View {
        VStack {
            Text("Super secret cross platform encryptor!!!")
                .multilineTextAlignment(.center)
            TextField("Enter your encryption value!!!", text: $input)
                .padding()
            Button(action: {
                
                // Send message to iPhone Companion App
                iOSModel.session.sendMessage(["message": input], replyHandler: nil) { error in
                    print(error.localizedDescription)
                }
            }) {
                Text("Send to iPhone!")
            }
            .padding(.horizontal)
        }
        .environmentObject(iOSModel)
    }
}

struct ContentView_Previews: PreviewProvider {
    static var previews: some View {
        ContentView()
    }
}
