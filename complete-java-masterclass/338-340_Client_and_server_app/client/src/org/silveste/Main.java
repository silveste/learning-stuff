package org.silveste;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.Socket;
import java.util.Scanner;

public class Main {

    public static void main(String[] args) {
        //client socket need the IP and port where server is listening
       try (Socket cSocket = new Socket("localhost", 5000)){
           //Set a timeout in case server is nt responding
           cSocket.setSoTimeout(5000);

           //A common pattern using sockets is to wrap the input with a bufferedReader and
           //the output with a printWriter
           //input
           BufferedReader input = new BufferedReader(
                   new InputStreamReader(cSocket.getInputStream()));
           //output
           //second parameter in printwriter constructor indicates to automatically flush the stream
           //If false to flush the stream the flush method must be used
           PrintWriter output = new PrintWriter(cSocket.getOutputStream(), true);

           Scanner sc = new Scanner(System.in);
           String echoString, response;

            do {
                System.out.println("Type the string to send: ");
                echoString = sc.nextLine();
                output.println(echoString);
                if(!echoString.equals("exit")){
                    response = input.readLine();
                    System.out.println("Server says: " + response);
                }

            }while (!echoString.equals("exit"));
       } catch (IOException e) {
           System.out.println("Client I/O exception " + e.getMessage());
       }
    }
}
