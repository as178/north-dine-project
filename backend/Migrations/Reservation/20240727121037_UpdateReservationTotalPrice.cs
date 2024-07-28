using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace backend.Migrations.Reservation
{
    /// <inheritdoc />
    public partial class UpdateReservationTotalPrice : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<decimal>(
                name: "TotalPrice",
                table: "ReservationFoodItems",
                type: "decimal(4,2)",
                nullable: false,
                oldClrType: typeof(decimal),
                oldType: "decimal(4,2)",
                oldComputedColumnSql: "[Quantity] * [Price]");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterColumn<decimal>(
                name: "TotalPrice",
                table: "ReservationFoodItems",
                type: "decimal(4,2)",
                nullable: false,
                computedColumnSql: "[Quantity] * [Price]",
                oldClrType: typeof(decimal),
                oldType: "decimal(4,2)");
        }
    }
}
