//
//  ViewModelWatch.swift
//  The Big Apple WatchKit Extension
//
//  Created by Carl Ian Voller on 30/4/22.
//

import Foundation
import WatchConnectivity

class ViewModelWatch : NSObject, WCSessionDelegate, ObservableObject {
    var session: WCSession
    
    @Published var message = "No messsages yet!"
    
    init(session: WCSession = .default){
        self.session = session
        super.init();
        self.session.delegate = self;
        self.connect()
    }
    
    func session(_ session: WCSession, activationDidCompleteWith activationState: WCSessionActivationState, error: Error?) {
        
    }
        
    func session(_ session: WCSession, didReceiveMessage message: [String : Any]) {
        DispatchQueue.main.async {
            self.message = message["message"] as? String ?? "Unknown"
        }
    }
    
    func session(_ session: WCSession, didReceiveMessage message: [String : Any], replyHandler: @escaping ([String : Any]) -> Void) {
        // code
    }
    
    func connect() {
        guard WCSession.isSupported() else {
            print("WCSession is not supported")
            return
        }
       
        session.activate()
    }
}
