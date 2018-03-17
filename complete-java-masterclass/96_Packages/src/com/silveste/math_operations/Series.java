package com.silveste.math_operations;

public class Series {
    //Returns the sum of all numbers from 0 to n
    public static int[] nSum(int lastNumber){
        lastNumber = Math.abs(lastNumber); //The number can be negative
        int sum = 0;
        int[] result = new int[lastNumber + 1]; // Result array will have lastNumbers + 1 elements
        for (int i = 0; i <= lastNumber; i++){
            sum += i;
            result[i] = sum;
        }
        return result;
    }

    public static int[] factorial(int lastNumber){
        lastNumber = Math.abs(lastNumber); //The number can be negative
        int[] result = new int[lastNumber + 1]; // Result array will have lastNumbers + 1 elements
        result[0] = 0;
        int product = 1;
        for (int i = 1; i <= lastNumber; i++){
            result[i] = product;
            product = result[i]*(i + 1);
        }
        return result;
    }

    public static int[] fibonacci(int lastNumber){
        lastNumber = Math.abs(lastNumber); //The number can be negative
        int[] result = new int[lastNumber + 1]; // Result array will have lastNumbers + 1 elements
        result[0] = 0;
        result[1] = 1;
        for (int i = 2; i <= lastNumber; i++){
            result[i] = result[i-2] + result[i-1];
        }
        return result;
    }

}
