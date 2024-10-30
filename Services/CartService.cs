using E_Commerce.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace E_Commerce.Services;

public class CartService
{
    private readonly ApplicationDbContext _context;

    public CartService(ApplicationDbContext context)
    {
        _context = context;
    }
    public async Task<IEnumerable<CartItem>> GetCartItemsAsync()
    {
        return await _context.CartItems.ToListAsync();
    }

    // Get a specific cart item by ID
     public async Task<List<CartItemDetails>> GetAllCartItemsAsync()
    {
        // Join CartItems with Products to get complete details
        var cartItemsDetails = await (from cartItem in _context.CartItems
                                       join product in _context.Products
                                       on cartItem.ProductID equals product.ProductID
                                       select new CartItemDetails
                                       {
                                           CartItemID = cartItem.CartItemID,
                                           ProductID = product.ProductID,
                                           ProductName = product.ProductName,
                                           Price = product.Price,
                                           Quantity = cartItem.Quantity
                                       }).ToListAsync();

        return cartItemsDetails;
    }


    // Add a product to the cart with a specified quantity
    public async Task<ActionResult<CartItem>> AddProductToCart(Product product, int quantity)
    {
        // Check if the product already exists in the cart
        var existingCartItem = await _context.CartItems
            .FirstOrDefaultAsync(ci => ci.ProductID == product.ProductID);

        if (existingCartItem != null)
        {
            // If it exists, increase the quantity by the specified amount
            existingCartItem.Quantity += quantity;
        }
        else
        {
            // If not, create a new CartItem with the specified quantity
            var newCartItem = new CartItem
            {
                ProductID = product.ProductID,
                Quantity = quantity // Set the specified quantity
            };

            _context.CartItems.Add(newCartItem);
            existingCartItem = newCartItem; // Update existingCartItem to be the new item
        }

        // Save changes to the database
        await _context.SaveChangesAsync();

        // Return the newly created or updated CartItem
        return new OkObjectResult(existingCartItem);
    }

    // public async Task<CartItem> UpdateProductAsync(CartItem cartItem)
    // {
    //     _context.Products.Update(cartItem);
    //     await _context.SaveChangesAsync();
    //     return cartItem;
    // }

    public async Task<CartItem> UpdateProductAsync(CartItem cartItem)
{
    // Find the existing cart item in the database by its ID
    var existingCartItem = await _context.CartItems.FindAsync(cartItem.CartItemID);

    if (existingCartItem == null)
    {
        throw new Exception("Cart item not found.");
    }

    // Update the quantity of the cart item
    existingCartItem.Quantity = cartItem.Quantity;

    // Save changes to the database
    await _context.SaveChangesAsync();

    return existingCartItem;
}

    public async Task<Product> GetProductByIdAsync(int id)
    {
        return await _context.Products.FindAsync(id);
    }

    public async Task<bool> DeleteProductAsync(int id)
    {
        var product = await _context.Products.FindAsync(id);
        if (product == null)
        {
            return false;
        }

        _context.Products.Remove(product);
        await _context.SaveChangesAsync();
        return true;
    }

    internal void GetCartItems()
    {
        throw new NotImplementedException();
    }

    internal void UpdateProduct(CartItem product)
    {
        throw new NotImplementedException();
    }
}