package com.silveste;

public class MyLinkedList implements NodeList {
    private ListItem root = null;

    public MyLinkedList(ListItem root){
        this.root = root;
    }

    @Override
    public ListItem getRoot() {
        return this.root;
    }

    @Override
    public boolean addItem(ListItem item) {
        if(this.root == null){
            this.root = item;
            System.out.println("Root: " + item.getValue());
            return true;
        }
        ListItem currentItem = this.root;
        while (currentItem != null){
          int comp = (currentItem.compareTo(item));
          if(comp < 0){
              if(currentItem.next() != null){
                  currentItem = currentItem.next();
              } else {
                  currentItem.setNext(item).setPrev(currentItem);//Remember setItem returns the item so we can setPrevious after that
                  return true;
              }
          } else if (comp > 0){
              if(currentItem.prev() != null){
                  currentItem.prev().setNext(item).setPrev(currentItem.prev());
                  item.setNext(currentItem).setPrev(item);
              } else {
                  this.root.setPrev(item);
                  item.setNext(this.root);
                  this.root = item;
              }
              return true;
          } else {
              System.out.println(item.getValue() + " is already in the list");
              return false;
          }
        }
        return false;
    }

    @Override
    public boolean removeItem(ListItem item) {
        if (item != null){
            System.out.println("Deleting item " + item.getValue());
        }
        ListItem currentItem = this.root;
        while (currentItem !=null){
            int comp = currentItem.compareTo(item);
            if (comp == 0){
                if(currentItem == this.root){
                    this.root = currentItem.next();
                } else {
                    currentItem.prev().setNext(currentItem.next());
                    if(currentItem.next() != null){
                        currentItem.next().setPrev(currentItem.prev());
                    }

                }
                return true;
            } else if (comp < 0){
                currentItem = currentItem.next();
            } else {
                return false;
            }
        }
        return false;
    }

    @Override
    public void traverse(ListItem root) {
        if(root == null){
            System.out.println("The list is empty");
        }
        while (root != null){
            System.out.println(root.getValue());
            root = root.next();
        }
    }
}
