using Microsoft.EntityFrameworkCore;
using NorthDineRestaurant.Data;
using NorthDineRestaurant.Repositories;

var builder = WebApplication.CreateBuilder(args);

// Configure DbContext
builder.Services.AddDbContext<ReviewContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("ReviewDatabase") ?? throw new InvalidOperationException("Connection string 'ReviewDatabase' not found.")));

builder.Services.AddDbContext<FoodItemContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("FoodItemDatabase") ?? throw new InvalidOperationException("Connection string 'FoodItemDatabase' not found.")));

builder.Services.AddDbContext<ReservationContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("ReservationDatabase") ?? throw new InvalidOperationException("Connection string 'ReservationDatabase' not found.")));

// Register repositories
builder.Services.AddScoped<IReviewRepository, ReviewRepository>();
builder.Services.AddScoped<IFoodItemRepository, FoodItemRepository>();
builder.Services.AddScoped<IReservationRepository, ReservationRepository>();

// Add services for controllers
builder.Services.AddControllers();

// Add CORS configuration
builder.Services.AddCors(options =>
{
    options.AddDefaultPolicy(policy =>
    {
        policy.SetIsOriginAllowed(origin => new Uri(origin).Host == "localhost")
            .AllowAnyHeader()
            .AllowAnyMethod() // Allow all methods (GET, POST, etc.)
            .AllowAnyOrigin(); // For localhost only. Allow all
    });
});

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();
app.UseStaticFiles(); // Serve static files from wwwroot

// Use CORS
app.UseCors();

app.UseAuthorization();

app.MapControllers(); // Map controllers

app.Run();
