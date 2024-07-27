using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations.Reservation
{
    /// <inheritdoc />
    public partial class UpdateForeignKeyConstraints : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ReservationFoodItems_FoodItems_FoodItemId",
                table: "ReservationFoodItems");

            migrationBuilder.AddForeignKey(
                name: "FK_ReservationFoodItems_FoodItems_FoodItemId",
                table: "ReservationFoodItems",
                column: "FoodItemId",
                principalTable: "FoodItems",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ReservationFoodItems_FoodItems_FoodItemId",
                table: "ReservationFoodItems");

            migrationBuilder.AddForeignKey(
                name: "FK_ReservationFoodItems_FoodItems_FoodItemId",
                table: "ReservationFoodItems",
                column: "FoodItemId",
                principalTable: "FoodItems",
                principalColumn: "Id",
                onDelete: ReferentialAction.Cascade);
        }
    }
}
