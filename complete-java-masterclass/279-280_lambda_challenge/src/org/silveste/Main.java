package org.silveste;

import java.sql.SQLOutput;
import java.util.ArrayList;
import java.util.Arrays;
import java.util.List;
import java.util.function.Function;
import java.util.function.Supplier;

public class Main {

    public static void main(String[] args) {

        //Challenge 1
        Runnable runnable1 = () -> {
            String myString = "Let's split this up into an array";
            String[] parts = myString.split(" ");
            for (String part: parts) {
                System.out.println(part);
            }
        };

        //Challenge 2
        //Function<String, String> first class indicates parameter that it takes, second the class that returns
        Function<String, String> lambdaFunction = s -> {
            StringBuilder returnVal = new StringBuilder();
            for (int i = 0; i < s.length(); i++) {
                if (i % 2 == 1) {
                    returnVal.append(s.charAt(i));
                }
            }
            return returnVal.toString();
        };

        //Challenge 3
        System.out.println("Challenge 4:");
        System.out.println(lambdaFunction.apply("1234567890"));

        //Challenge 5
        System.out.println("Challenge 5:");
        System.out.println(everySecondCharacter(lambdaFunction, "1234567890"));

        //Challenge 6
        Supplier<String> iLoveJava = () -> "I Love Java";

        //Challenge 7
        System.out.println("Challenge 7:");
        System.out.println(iLoveJava.get());


        List<String> topNames2015 = Arrays.asList(
                "Amelia",
                "Olivia",
                "Emily",
                "isla",
                "Ava",
                "oliver",
                "Jack",
                "charlie",
                "Harry",
                "Jacob"
        );

        //Challenge 9 and 10
//        System.out.println("Challenge 9 and 10:");
//        List<String> result = new ArrayList<>();
//        topNames2015.forEach(name -> result.add(name.substring(0,1).toUpperCase() + name.substring(1)));
//        result.sort(String::compareTo);
//        result.forEach(System.out::println);

        //Challenge 11
        System.out.println("Challenge 11:");
        topNames2015.stream()
                .map(name -> name.substring(0,1).toUpperCase() + name.substring(1))
                .peek(System.out::println) //Challange 14: usefult method to debug chains. Should print the list not sorted
                .sorted(String::compareTo)
                .forEach(System.out::println);

        //Challenge 12
        System.out.println("Challenge 12:");
        long namesStartA = topNames2015.stream()
                .filter(name -> name.startsWith("A"))
                .count();
        System.out.println("Names that start with \"A\" " + namesStartA );
    }

    //Challenge 4
    public static String everySecondCharacter(Function<String, String> f, String string){
        return f.apply(string);
    }

    //
}


