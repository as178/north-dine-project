using Microsoft.EntityFrameworkCore;
using NorthDineRestaurant.Data;
using NorthDineRestaurant.Repositories;
using Microsoft.OpenApi.Models;
using dotenv.net;
using Microsoft.OpenApi.Any;

var builder = WebApplication.CreateBuilder(args);

// Load environment variables from .env file
DotEnv.Load();

// Configure DbContext
builder.Services.AddDbContext<ReviewContext>(options =>
    options.UseSqlServer(Environment.GetEnvironmentVariable("REVIEW_DATABASE_CONNECTION_STRING")
                         ?? throw new InvalidOperationException("Connection string 'ReviewDatabase' not found.")));

builder.Services.AddDbContext<FoodItemContext>(options =>
    options.UseSqlServer(Environment.GetEnvironmentVariable("FOOD_ITEM_DATABASE_CONNECTION_STRING")
                         ?? throw new InvalidOperationException("Connection string 'FoodItemDatabase' not found.")));

builder.Services.AddDbContext<ReservationContext>(options =>
    options.UseSqlServer(Environment.GetEnvironmentVariable("RESERVATION_DATABASE_CONNECTION_STRING")
                         ?? throw new InvalidOperationException("Connection string 'ReservationDatabase' not found.")));

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
            .AllowAnyMethod()
            .AllowAnyOrigin(); // For localhost only. Allow all
    });
});

// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen(c =>
{
    c.SwaggerDoc("v1", new OpenApiInfo { Title = "NorthDineAPI", Version = "v1" });

    c.MapType<DateTime>(() => new OpenApiSchema
    {
        Type = "string",
        Format = "date",
        Example = new OpenApiString("dd/MM/yyyy")
    });

    c.MapType<TimeSpan>(() => new OpenApiSchema
    {
        Type = "string",
        Format = "time",
        Example = new OpenApiString("hh:mm tt")
    });
});

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
