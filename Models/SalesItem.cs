using System.ComponentModel.DataAnnotations.Schema;

namespace E_Commerce.Models;

public class SalesItem
{
    public int SalesItemID { get; set; }
    public int SaleID { get; set; }
    public int ProductID { get; set; }
    public int Quantity { get; set; }
}