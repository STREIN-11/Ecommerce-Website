using E_Commerce.Models;
using Microsoft.EntityFrameworkCore;
public class ApplicationDbContext : DbContext
{
    protected readonly IConfiguration Configuration;

    public ApplicationDbContext(IConfiguration configuration)
    {
        Configuration = configuration;
    }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
    {
        // connect to sqlite database
        optionsBuilder.UseSqlite(Configuration.GetConnectionString("DefaultConnection"));
    }
    public DbSet<Product> Products { get; set; }
    public DbSet<Discount> Discounts { get; set; }
    public DbSet<CartItem> CartItems { get; set; }
    public DbSet<Sale> Sales { get; set; }
    public DbSet<SalesItem> SalesItems { get; set; }

    // public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options) : base(options) { }
}