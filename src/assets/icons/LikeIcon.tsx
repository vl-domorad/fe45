import React from "react";

export const LikeIcon = ({ width = "49", height = "25", fill = "#313037" }) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 49 25"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M18.292 20.65C18.218 21.136 17.794 21.5 17.292 21.5H17.28H7V11.712L10.608 3.594C11.415 3.852 12 4.608 12 5.5V9.5C12 10.052 12.447 10.5 13 10.5H18.674C18.728 10.502 18.78 10.503 18.832 10.511C19.097 10.551 19.33 10.692 19.488 10.907C19.646 11.122 19.712 11.385 19.672 11.648L18.292 20.65ZM5 21.5H3C2.449 21.5 2 21.051 2 20.5V13.5C2 12.948 2.449 12.5 3 12.5H5V21.5ZM21.099 9.72C20.623 9.075 19.925 8.654 19.132 8.533C18.972 8.509 18.814 8.504 18.66 8.5H14V5.5C14 3.294 12.206 1.5 10 1.5C9.605 1.5 9.247 1.733 9.086 2.093L5.35 10.5H3C1.346 10.5 0 11.845 0 13.5V20.5C0 22.154 1.346 23.5 3 23.5H17.269H17.304C18.776 23.5 20.048 22.409 20.269 20.951L21.648 11.95C21.77 11.157 21.574 10.366 21.099 9.72Z"
        fill={fill}
      />
      <path
        d="M37.5553 18.5H30.6273V16.628L34.8833 11.684C35.278 11.2147 35.4753 10.756 35.4753 10.308C35.4753 9.88133 35.3527 9.54 35.1073 9.284C34.8727 9.01733 34.5367 8.884 34.0993 8.884C33.7047 8.884 33.374 9.00133 33.1073 9.236C32.8407 9.46 32.7073 9.828 32.7073 10.34H30.6273C30.6273 9.32667 30.9527 8.52133 31.6033 7.924C32.2647 7.316 33.0967 7.012 34.0993 7.012C35.1233 7.012 35.9553 7.31067 36.5953 7.908C37.2353 8.50533 37.5553 9.31067 37.5553 10.324C37.5553 10.836 37.4647 11.268 37.2833 11.62C37.102 11.972 36.7874 12.4093 36.3393 12.932L33.1553 16.628H37.5553V18.5ZM46.1789 15.204C46.1789 16.2493 45.8429 17.076 45.1708 17.684C44.5095 18.292 43.6935 18.596 42.7228 18.596C41.7522 18.596 40.9308 18.292 40.2588 17.684C39.5868 17.076 39.2508 16.2493 39.2508 15.204V10.404C39.2508 9.35867 39.5868 8.532 40.2588 7.924C40.9308 7.316 41.7522 7.012 42.7228 7.012C43.6935 7.012 44.5095 7.316 45.1708 7.924C45.8429 8.532 46.1789 9.35867 46.1789 10.404V15.204ZM44.0988 15.188V10.436C44.0988 9.956 43.9708 9.57733 43.7148 9.3C43.4695 9.02267 43.1388 8.884 42.7228 8.884C42.3068 8.884 41.9708 9.02267 41.7148 9.3C41.4588 9.57733 41.3308 9.956 41.3308 10.436V15.188C41.3308 15.668 41.4588 16.0467 41.7148 16.324C41.9708 16.5907 42.3068 16.724 42.7228 16.724C43.1388 16.724 43.4695 16.5907 43.7148 16.324C43.9708 16.0467 44.0988 15.668 44.0988 15.188Z"
        fill={fill}
      />
    </svg>
  );
};