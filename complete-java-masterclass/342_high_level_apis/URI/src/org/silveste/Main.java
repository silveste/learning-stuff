package org.silveste;

import java.net.MalformedURLException;
import java.net.URI;
import java.net.URISyntaxException;
import java.net.URL;

public class Main {

    public static void main(String[] args) {
        try {
            // The following URI is still valid as it doesn't throw an exception
            //URI uri = new URI("whatever");

            //The following is a valid URI but not a valid URL, we get an error as the protocol db is unkknown
            //URI uri = new URI("db://username:password@myserver.com:5000/catalogue/whatever?utm_param=argument-1#page-anchor");

            //The following is a valid URI and URL, the URI is the same as the URL because is an absolute path for the URI
            //URIs could be not absolute (could be relative path), URLs must be absolute
            //URI uri = new URI("http://username:password@myserver.com:5000/catalogue/whatever?utm_param=argument-1#page-anchor");

            //The following URI has a relative path, this will cause exceptions when trying to retrieve URI components that are not
            //in the URi (such as host or port in this example) or when trying to convert into an URl without the information
            //to make it absolute
            URI uri = new URI("/catalogue/whatever?utm_param=argument-1#page-anchor");

            //Usually in java apps there are different URIs with information of different components
            //And when need to access the resource the URIs are merged into an absolute URI to retrieve the URL
            URI baseUri = new URI("http://username:password@myserver.com:5000");
            URI resolveUri = baseUri.resolve(uri);
            URL url = resolveUri.toURL();

//            System.out.println("Scheme: " + uri.getScheme());
//            System.out.println("Scheme-specific part: " + uri.getSchemeSpecificPart());
//            System.out.println("Authorithy: " + uri.getAuthority());
//            System.out.println("User info: " + uri.getUserInfo());
//            System.out.println("Host: " + uri.getHost());
//            System.out.println("Port: " + uri.getPort());
//            System.out.println("Path: " + uri.getPath());
//            System.out.println("Query: " + uri.getQuery());
//            System.out.println("Fragment: " + uri.getFragment());

            //converting and URI to an URL
//            URL url = uri.toURL();
            System.out.println("URL: " + url);
        } catch (URISyntaxException e) {
            System.out.println("URI Bad Syntax " + e.getMessage());
        } catch (MalformedURLException e) {
            System.out.println("Malformed URL " + e.getMessage());
        }
    }
}
