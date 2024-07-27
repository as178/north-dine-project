using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations.Reservation
{
    /// <inheritdoc />
    public partial class UpdateReservationContext : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropForeignKey(
                name: "FK_ReservationFoodItems_FoodItems_FoodItemId",
                table: "ReservationFoodItems");

            migrationBuilder.DropPrimaryKey(
                name: "PK_FoodItems",
                table: "FoodItems");

            migrationBuilder.RenameTable(
                name: "FoodItems",
                newName: "FoodItem");

            migrationBuilder.AddPrimaryKey(
                name: "PK_FoodItem",
                table: "FoodItem",
                column: "Id");

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
            migrationBuilder.DropForeignKey(
                name: "FK_ReservationFoodItems_FoodItem_FoodItemId",
                table: "ReservationFoodItems");

            migrationBuilder.DropPrimaryKey(
                name: "PK_FoodItem",
                table: "FoodItem");

            migrationBuilder.RenameTable(
                name: "FoodItem",
                newName: "FoodItems");

            migrationBuilder.AddPrimaryKey(
                name: "PK_FoodItems",
                table: "FoodItems",
                column: "Id");

            migrationBuilder.AddForeignKey(
                name: "FK_ReservationFoodItems_FoodItems_FoodItemId",
                table: "ReservationFoodItems",
                column: "FoodItemId",
                principalTable: "FoodItems",
                principalColumn: "Id",
                onDelete: ReferentialAction.Restrict);
        }
    }
}
