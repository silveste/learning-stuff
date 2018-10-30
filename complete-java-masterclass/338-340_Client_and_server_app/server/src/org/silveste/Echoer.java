package org.silveste;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.io.PrintWriter;
import java.net.Socket;
import java.net.SocketTimeoutException;

public class Echoer extends Thread {
    private Socket socket;

    public Echoer (Socket socket){
        this.socket = socket;
    }

    @Override
    public void run(){
        try {
            BufferedReader input = new BufferedReader(
                    new InputStreamReader(socket.getInputStream()));
            PrintWriter output = new PrintWriter(socket.getOutputStream(), true);
            String client = Thread.currentThread().getId() + "-" + Thread.currentThread().getName();
            System.out.println("Client connected: " + client);
            while (true) {
                String echoString = input.readLine();
                if (echoString.equals("exit")) {
                    break;
                }
                output.println(echoString);
                System.out.println(Thread.currentThread().getId() + "-" + Thread.currentThread().getName() + " says: " + echoString);
            }
        } catch (SocketTimeoutException e){
            System.out.println("Server timeout");
        } catch (IOException e){
            System.out.println("Server I/O exception for specific client: " + e.getMessage());
        } finally {
            try {
                socket.close();
                System.out.println(Thread.currentThread().getId()+ "-" + Thread.currentThread().getName() + " socket-connection closed ");
            } catch (IOException e) {
                System.out.println("I couldn't close the socket: " + e.getMessage());
            }
        }
    }
}
