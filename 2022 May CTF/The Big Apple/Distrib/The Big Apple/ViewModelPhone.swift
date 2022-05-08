//
//  ViewModelPhone.swift
//  The Big Apple
//
//  Created by Carl Ian Voller on 30/4/22.
//

import Foundation
import WatchConnectivity

class ViewModelPhone: NSObject, WCSessionDelegate, ObservableObject {
    
    @Published var message = "";
    
    var session: WCSession
    
    init(session: WCSession = .default){
        self.session = session
        super.init();
        self.session.delegate = self
        self.connect()
    }
    
    func connect() {
        guard WCSession.isSupported() else {
            print("WCSession is not supported")
            return
        }
       
        session.activate()
    }
    
    func session(_ session: WCSession, activationDidCompleteWith activationState: WCSessionActivationState, error: Error?) {
    
    }
    
    func sessionDidBecomeInactive(_ session: WCSession) {
        
    }
    
    func session(_ session: WCSession, didReceiveMessage message: [String : Any]) {
        DispatchQueue.main.async {
            self.message = message["message"] as? String ?? "Unknown"
        }
    }
    
    func sessionDidDeactivate(_ session: WCSession) {
        
    }
    
}
