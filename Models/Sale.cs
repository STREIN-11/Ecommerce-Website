namespace E_Commerce.Models;

public class Sale
{
    public int SaleID { get; set; }
    public decimal TotalAmount { get; set; }
    public DateTime SaleDate { get; set; }
    public ICollection<SalesItem> SalesItems { get; set; }
}