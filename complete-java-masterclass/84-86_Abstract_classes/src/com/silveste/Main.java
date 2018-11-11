package com.silveste;

public class Main {

    public static void main(String[] args) {
//	    MyLinkedList list = new MyLinkedList(null);
	    SearchTree list = new SearchTree(null);
	    //list.traverse(list.getRoot());

	    String stringData = "Dublin London Madrid Paris Dublin Lisboa Berlin Roma Budapest ";

	    String[] data = stringData.split(" ");
	    for (String s : data){
	        list.addItem(new Node(s));
        }
       list.traverse(list.getRoot());

//	    list.removeItem(new Node("Paris"));
//        list.traverse(list.getRoot());
		list.removeItem(new Node("Roma"));
        list.traverse(list.getRoot());
        list.removeItem(new Node("Budapest"));
		list.traverse(list.getRoot());
        list.removeItem(new Node("Madrid"));
        list.traverse(list.getRoot());
    }
}
