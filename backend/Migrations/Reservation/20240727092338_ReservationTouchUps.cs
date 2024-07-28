using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations.Reservation
{
    /// <inheritdoc />
    public partial class ReservationTouchUps : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            // Drop the existing TotalPrice column if it exists
            migrationBuilder.DropColumn(
                name: "TotalPrice",
                table: "ReservationFoodItems");

            // Ensure the FoodItem table is not renamed
            // No rename operation required here

            // Add the TotalPrice column as a regular column
            migrationBuilder.AddColumn<decimal>(
                name: "TotalPrice",
                table: "ReservationFoodItems",
                type: "decimal(4,2)",
                nullable: false,
                defaultValue: 0m);

            // Recreate the foreign key constraint if needed
            // Ensure it references the FoodItem table correctly
            migrationBuilder.AddForeignKey(
                name: "FK_ReservationFoodItems_FoodItem_FoodItemId",
                table: "ReservationFoodItems",
                column: "FoodItemId",
                principalTable: "FoodItem",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            // Drop the TotalPrice column
            migrationBuilder.DropColumn(
                name: "TotalPrice",
                table: "ReservationFoodItems");

            // Add the TotalPrice column back as a computed column if needed
            migrationBuilder.AddColumn<decimal>(
                name: "TotalPrice",
                table: "ReservationFoodItems",
                type: "decimal(4,2)",
                nullable: false,
                computedColumnSql: "[Quantity] * [Price]");

            // Recreate the foreign key constraint if needed
            migrationBuilder.AddForeignKey(
                name: "FK_ReservationFoodItems_FoodItem_FoodItemId",
                table: "ReservationFoodItems",
                column: "FoodItemId",
                principalTable: "FoodItem",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
