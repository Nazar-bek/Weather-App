import { describe, it, expect, vi } from "vitest";
import { debounce } from "../../utils/debounce";


vi.useFakeTimers();

describe("debounce utility", () => {
  it("delays function execution", () => {
    const mockFn = vi.fn();
    const debouncedFn = debounce(mockFn, 500);

    debouncedFn();
    debouncedFn();
    debouncedFn();

    expect(mockFn).not.toBeCalled();

    vi.advanceTimersByTime(500);

    expect(mockFn).toBeCalledTimes(1);
  });

  it("uses the last call's arguments", () => {
    const mockFn = vi.fn();
    const debouncedFn = debounce(mockFn, 300);

    debouncedFn("first");
    debouncedFn("second");

    vi.advanceTimersByTime(300);

    expect(mockFn).toHaveBeenCalledWith("second");
  });
});
