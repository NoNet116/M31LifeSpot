using System;
using Microsoft.AspNetCore.Hosting;
using Microsoft.Extensions.Hosting;
using static LifeSpot.Logger;

namespace LifeSpot
{
    public class Program
    {
        public static void Main(string[] args)
        {
            // Выводим информационное сообщение 
            PrintMessage( (() => Info("Запускаем приложение")) );
            
            CreateHostBuilder(args).Build().Run();
        }

        public static IHostBuilder CreateHostBuilder(string[] args) =>
            Host.CreateDefaultBuilder(args)
                .ConfigureWebHostDefaults(webBuilder => { webBuilder.UseStartup<Startup>(); });
    }
}