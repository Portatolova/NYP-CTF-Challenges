//
//  OutputField.swift
//  The Big Apple
//
//  Created by Carl Ian Voller on 30/4/22.
//

import SwiftUI
import UIKit

struct OutputFieldView: UIViewRepresentable {
    
    @Binding var input: String
    @Binding var output: String
    
    var outputFieldView = UIView()
    var textField = UILabel()
    
    class Coordinator: NSObject {
        
        var input: Binding<String>
        var output: Binding<String>
        var outputFieldView: UIView
        var textField: UILabel
        
        init(input: Binding<String>, output: Binding<String>, outputFieldView: UIView, textField: UILabel) {
            self.input = input
            self.output = output
            self.outputFieldView = outputFieldView
            self.textField = textField
        }
        
        func onInputUpdate() {
            let encoder = MySuperSecretEncoder()
            let txt = Data(self.input.wrappedValue.utf8).base64EncodedString();
            self.textField.text = encoder.encode(txt) ?? ""
        }
        
        // input --> base64 --> base64 --> ascii value + 1 (lowercase)
        
    }
    
    func makeUIView(context: Context) -> UIView {
        
        outputFieldView.frame.size.height = 100
        textField.frame.size.height = 100
        textField.text = "No message to encode"
        textField.textColor = UIColor.white
        
        textField.frame = CGRect(x: 0, y: 0, width: UIScreen.main.bounds.width, height: 100)
        textField.textAlignment = .center
        textField.numberOfLines = 0
        
        outputFieldView.addSubview(textField)
                
        return outputFieldView
    }
    
    func updateUIView(_ uiView: UIView, context: Context) {
        context.coordinator.input = $input
        context.coordinator.onInputUpdate()
    }
    
    func makeCoordinator() -> Coordinator {
        return Coordinator(input: $input, output: $output, outputFieldView: outputFieldView, textField: textField)
    }
}
