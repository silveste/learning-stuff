package com.silveste.testing_jar;

import com.silveste.math_operations.Series;

public class Main {

    public static void main(String[] args) {
        int lastNumber = 15;
        print(Series.nSum(15));
        print(Series.factorial(15));
        print(Series.fibonacci(15));

    }
    private static void print(int[] arrayToPrint){
        for(int i : arrayToPrint){
            System.out.println(i);
        }
    }
}
