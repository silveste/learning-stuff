package org.silveste;

import org.junit.Before;

import static org.junit.Assert.*;

public class UtilitiesTest {

    private Utilities ut;

    //Challenge 9
    @org.junit.Before
    public void setup(){
        ut = new Utilities();
    }

    @org.junit.Test
    public void everyNthChar() {
        // fail("this test has not been implemented"); //Challengue 1
        // Challengue 4
        //Utilities ut = new Utilities();
        char [] output = ut.everyNthChar(new char[] {'h','e','l','l','o'},2);
        assertArrayEquals(new char[]{'e','l'}, output); //assertEquals wouldn't be valid here as the arrays are different instances of the same array
        //Challenge 5

        char [] output2 = ut.everyNthChar(new char[] {'h','e','l','l','o'},8);
        assertArrayEquals(new char[]{'h','e','l','l','o'}, output2);
    }

    @org.junit.Test
    public void removePairs() {
        // fail("this test has not been implemented"); //Challengue 1

        //Challengue 2
        //Utilities ut = new Utilities();
        assertEquals("ABCDEF", ut.removePairs("AABCDDEFF"));
        assertEquals("ABCABDEF", ut.removePairs("ABCCABDEEF"));

        //Challengue 3
        assertNull("Didn't get null when passed null to the method", ut.removePairs(null));
        assertEquals("A", ut.removePairs("A"));
        assertEquals("", ut.removePairs(""));
    }

    @org.junit.Test
    public void converter() {
        //fail("this test has not been implemented"); //Challengue 1
        //Challenge 7
        //Utilities ut = new Utilities();
        assertEquals(300, ut.converter(10,5));
    }

    //Challenge 8
    @org.junit.Test(expected = ArithmeticException.class)
    public void converterArithmeticException() {
        //Utilities ut = new Utilities();
        ut.converter(10, 0);
    }

    @org.junit.Test
    public void nullIfOddLengths() {
        // fail("this test has not been implemented"); //Challengue 1
        //Challenge 6
        //Utilities ut = new Utilities();
        assertNull(ut.nullIfOddLengths("odd"));
        assertNotNull(ut.nullIfOddLengths("even"));

    }
}