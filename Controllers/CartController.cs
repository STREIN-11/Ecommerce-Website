using E_Commerce.Models;
using E_Commerce.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace E_Commerce.Controllers;

[ApiController]
[Route("[controller]")]
public class CartController : ControllerBase
{
    private readonly CartService CartService;

    public CartController(CartService cartService)
    {
        CartService = cartService;
    }
    [HttpPost]
    public async Task<ActionResult<CartItem>> PostProduct([FromBody] Product product, [FromQuery] int quantity)
    {
        // Ensure the `product` object and `quantity` are correctly received and valid
        if (product == null)
        {
            return BadRequest("Product is null.");
        }

        if (quantity <= 0)
        {
            return BadRequest("Quantity must be greater than zero.");
        }

        // Call the CartService to add the product to the cart with the specified quantity
        var cartItem = await CartService.AddProductToCart(product, quantity);

        if (cartItem == null)
        {
            return StatusCode(500, "An error occurred while adding the product to the cart.");
        }

        // Return the result (newly added or updated CartItem)
        return Ok(cartItem);
    }

    [HttpGet]
    public async Task<ActionResult<IEnumerable<object>>> GetAllCartItems()
    {
        var cartItems = await CartService.GetAllCartItemsAsync();

        if (cartItems == null || !cartItems.Any())
        {
            return NotFound("No items found in the cart.");
        }

        // Create a list to hold the response objects
        var result = cartItems.Select(item => new
        {
            CartItemID = item.CartItemID,
            ProductID = item.ProductID,
            ProductName = item.ProductName,
            Quantity = item.Quantity,
            TotalPrice = item.Price * item.Quantity
        });

        return Ok(result);
    }
    [HttpPut("{id}")]
    public async Task<IActionResult> PutProduct(int id, CartItem product)
    {
        if (id != product.CartItemID)
        {
            // Console.WriteLine("")
            return BadRequest();
        }

        try
        {
            await CartService.UpdateProductAsync(product);
        }
        catch (DbUpdateConcurrencyException)
        {
            if (await CartService.GetProductByIdAsync(id) == null)
            {
                return NotFound();
            }
            else
            {
                throw;
            }
        }

        return NoContent();
    }


    [HttpDelete("{id}")]
    public async Task<IActionResult> DeleteProduct(int id)
    {
        var result = await CartService.DeleteProductAsync(id);

        if (!result)
        {
            return NotFound();
        }

        return NoContent();
    }
}