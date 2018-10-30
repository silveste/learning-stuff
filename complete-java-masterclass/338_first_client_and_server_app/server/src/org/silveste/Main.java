package org.silveste;

import java.io.*;
import java.net.ServerSocket;
import java.net.Socket;

public class Main {

    public static void main(String[] args) {
        //The port indicates the port that server is listening
        try (ServerSocket sSocket = new ServerSocket(5000)) {
            //Acept metohd block the app until a client connects to the server
            Socket socket = sSocket.accept();
            System.out.println("Client Connected");

            //A common pattern using sockets is to wrap the input with a bufferedReader and
            //the output with a printWriter
            //input
            BufferedReader input = new BufferedReader(
                    new InputStreamReader(socket.getInputStream()));
            //output
            //second parameter in printwriter constructor indicates to automatically flush the stream
            //If false to flush the stream the flush method must be used
            PrintWriter output = new PrintWriter(socket.getOutputStream(), true);

            while (true) {
                String echoString = input .readLine();
                System.out.println("From client: " + echoString);
                if (echoString.equals("exit")){
                    break;
                }
                output.println("Server here, client said: " + echoString);
            }

        } catch (IOException e){
            System.out.println("Server I/O exception: " + e.getMessage());
        }
    }
}
