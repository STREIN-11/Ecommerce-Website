using System.ComponentModel.DataAnnotations.Schema;

namespace E_Commerce.Models;

public class CartItem
{
    public int CartItemID { get; set; }
    public int ProductID { get; set; }
    public int Quantity { get; set; }
}



