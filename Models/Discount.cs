namespace E_Commerce.Models;

public class Discount
{
    public int DiscountID { get; set; }
    public string DiscountCode { get; set; }
    public decimal DiscountPercentage { get; set; }
}