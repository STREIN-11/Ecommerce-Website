namespace E_Commerce.Models;

public class Product
{
    public int ProductID { get; set; }
    public string ProductName { get; set; }
    public decimal Price { get; set; }
   
}

public class Quantity
{
    public int ProductID { get; set; }
    public required string ProductQuantity { get; set; }
    public decimal Price { get; set; }
   
}

public class CartItemDetails
{
    public int CartItemID { get; set; }
    public int ProductID { get; set; }
    public string ProductName { get; set; }
    public decimal Price { get; set; }
    public int Quantity { get; set; }
}