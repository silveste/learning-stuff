package org.silveste;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.*;


public class Main {

    public static void main(String[] args) {
        try {
            URL url = new URL("http://example.org");
//Reading from internet. There 2 ways to do it:
// Method 1: Using URL.openStream()
//            BufferedReader inputStream = new BufferedReader(
//                    new InputStreamReader(url.openStream()));


// Method 2: Using URLConnection
            URLConnection urlConnection = url.openConnection();
            urlConnection.setDoOutput(true); //this statement allows to write to the connection, (Not used now, only to show an example of some config)
            //The connect method set the connection and once called it isn't possible to change the configuration,
            //so that all configuration of the connection (such as setDoOutput) must be done between open the connection and set it
            urlConnection.connect();

            BufferedReader inputStream = new BufferedReader(
                    new InputStreamReader(urlConnection.getInputStream()));


            String line = "";
            while (line != null){
                line = inputStream.readLine();
                System.out.println(line);
            }
            inputStream.close();


// Converting URLs to URIs
//            URI uri = url.toURI();

//            System.out.println("Scheme: " + uri.getScheme());
//            System.out.println("Scheme-specific part: " + uri.getSchemeSpecificPart());
//            System.out.println("Authorithy: " + uri.getAuthority());
//            System.out.println("User info: " + uri.getUserInfo());
//            System.out.println("Host: " + uri.getHost());
//            System.out.println("Port: " + uri.getPort());
//            System.out.println("Path: " + uri.getPath());
//            System.out.println("Query: " + uri.getQuery());
//            System.out.println("Fragment: " + uri.getFragment());

        } catch (MalformedURLException e) {
            System.out.println("Malformed URL " + e.getMessage());
//        } catch (URISyntaxException e) {
//            System.out.println("URI syntax error: " + e.getMessage());
        } catch (IOException e) {
            System.out.println("Error opening URL stream " + e.getMessage());
        }
    }
}
