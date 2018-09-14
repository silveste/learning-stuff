package org.silveste;

import org.junit.runner.RunWith;

import org.junit.runners.Parameterized;

import java.util.Arrays;
import java.util.Collection;

import static org.junit.Assert.assertEquals;

@RunWith(Parameterized.class)
public class UtilitiesTestParameterized {

    private Utilities ut;

    private String input;
    private String output;

    public UtilitiesTestParameterized(String input, String output) {
        this.input = input;
        this.output = output;
    }

    @org.junit.Before
    public void setup(){
        ut = new Utilities();
    }

    @Parameterized.Parameters
    public static Collection<Object[]> testConditions(){
        return Arrays.asList(new Object[][]{
                {"ABBCDEEFF", "ABCDEF"},
                {"AB88EFFG", "AB8EFG"},
                {"112233445566", "123456"},
                {"A","A"}
        });
    }

    @org.junit.Test
    public void removePairs() {
        assertEquals(output, ut.removePairs(input));
    }
}
