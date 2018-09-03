package org.silveste;

import java.util.regex.Matcher;
import java.util.regex.Pattern;

public class Main {

    public static void main(String[] args) {
	// Challenge 1
        System.out.println("Challenge 1");
        String challenge1 = "I want a bike.";
        System.out.println(challenge1.matches("I want a bike."));

    // Challange 2
        System.out.println("Challenge 2");
        String regExp = "I want a \\w+\\.";
        System.out.println(challenge1.matches(regExp));
        String challenge2 = "I want a ball.";
        System.out.println(challenge2.matches(regExp));

    // Challenge 3
        System.out.println("Challenge 3");
        Pattern pattern = Pattern.compile(regExp);
        Matcher matcher1 = pattern.matcher(challenge1);
        System.out.println(matcher1.matches());
        Matcher matcher2 = pattern.matcher(challenge2);
        System.out.println(matcher2.matches());

    //Challenge 4
        System.out.println("Challenge 4");
        String challenge4 = "Replace all blanks with underscores.";
        System.out.println(challenge4);
        System.out.println(challenge4.replaceAll("\\s","_"));

    //Challenge 5
        System.out.println("Challenge 5");
        String challenge5 = "aaabccccccccddefffg";
        System.out.println(challenge5.matches("[a-g]{19}"));

    //Challenge 6
        System.out.println("Challenge 6");
        System.out.println(challenge5.matches("^a{3}bc{8}d{2}ef{3}g$"));

    //Challenge 7
        System.out.println("Challenge 7");
        String challenge7 = "abcd.135";
        System.out.println(challenge7.matches("[a-zA-Z]+\\.\\d+"));

    //Challenge 8
        System.out.println("Challenge 8");
        String challenge8 = "abcd.135uvqz.7tzik.999";
        Pattern patternch8 = Pattern.compile("[a-zA-Z]+\\.(\\d+)[a-zA-Z]?");
        Matcher matccherch8 = patternch8.matcher(challenge8);
        while(matccherch8.find()){
            System.out.println("Match: " + matccherch8.group(1));
        }
    //Challenge 9
        System.out.println("Challenge 9");
        String challenge9 = "abcd.135\tuvqz.7\ttzik.999\n";
        Pattern patternch9 = Pattern.compile("[a-zA-Z]+\\.(\\d+)\\s");
        Matcher matccherch9 = patternch8.matcher(challenge9);
        while(matccherch9.find()){
            System.out.println("Match: " + matccherch9.group(1));
        }

    //Challenge 10
        System.out.println("Challenge 10");
        matccherch9.reset();
        while(matccherch9.find()){
            System.out.println(
                    "Start: " + matccherch9.start(1) +
                    " End: " + (matccherch9.end(1) - 1) +
                    " Match: " + matccherch9.group(1));
        }

    //Challenge 11
        System.out.println("Challenge 11");
        String challenge11= "{0, 2}, {0, 5}, {1, 3}, {2, 4}";
        Pattern patternch11 = Pattern.compile("\\{(.+?)\\}");
        Matcher matcherch11 = patternch11.matcher(challenge11);
        while(matcherch11.find()){
            System.out.println("Match: " + matcherch11.group(1));
        }

    //Challenge 12
        System.out.println("Challenge 12");
        String zipCode = "11111";
        System.out.println(zipCode.matches("\\d{5}"));

    //Challenge 13
        System.out.println("Challenge 13");
        String zipCode2 = "11111-1111";
        System.out.println(zipCode2.matches("\\d{5}-\\d{4}"));

    //Challenge 14
        System.out.println("Challenge 14");
        System.out.println(zipCode.matches("\\d{5}(-\\d{4})?"));
        System.out.println(zipCode2.matches("\\d{5}(-\\d{4})?"));
    }
}
