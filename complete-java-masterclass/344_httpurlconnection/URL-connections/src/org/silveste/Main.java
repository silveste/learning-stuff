package org.silveste;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.*;
import java.util.List;
import java.util.Map;


public class Main {

    public static void main(String[] args) {
        try {
         // Retrieves an example web page
         //   URL url = new URL("http://example.org");
         // Retrieves an 404 error
         //   URL url = new URL("http://example.org/wrongurl.com");
         // Retrieves an XML
            URL url = new URL("https://api.flickr.com/services/feeds/photos_public.gne?tags=cats");

// Getting the headers with URLConnection

//            URLConnection urlConnection = url.openConnection();
//            urlConnection.setDoOutput(true);
//            urlConnection.connect();
//
//
//            Map<String, List<String>> headerFields = urlConnection.getHeaderFields();
//            for (Map.Entry<String, List<String>> entry : headerFields.entrySet()){
//                String key = entry.getKey();
//                List<String> value = entry.getValue();
//                System.out.println("------Key = " + key);
//                for(String string : value){
//                    System.out.println("value = " + value);
//                }
//            }

// Playing with HttpURLConnection class

            //To use https protocol we should use the class HttpsURLConnection provided in Java.net package
            HttpURLConnection connection = (HttpURLConnection) url.openConnection();
            connection.setRequestMethod("GET");
            connection.setRequestProperty("User-Agent", "Chrome");
            connection.setReadTimeout(30000);

            int responseCode = connection.getResponseCode(); //Get response code implicit call .connect() method
            System.out.println("Response code: " + responseCode);

            if(responseCode != 200){
                System.out.println("Error reading web page");
                System.out.println(connection.getResponseMessage());
                return;
            }
            BufferedReader inputReader = new BufferedReader(
                    new InputStreamReader(connection.getInputStream()));

            String line = "";
            while((line = inputReader.readLine()) != null){
                System.out.println(line);
            }

            inputReader.close();



        } catch (MalformedURLException e) {
            System.out.println("Malformed URL " + e.getMessage());
        } catch (IOException e) {
            System.out.println("Error opening URL stream " + e.getMessage());
        }
    }
}
