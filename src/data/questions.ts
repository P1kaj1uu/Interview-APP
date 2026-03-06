import { Question, AIQuestion } from '../types';

export const questions: Question[] = [
  // JavaScript 题目
  {
    id: 'js-001',
    title: '两数之和',
    description: `给定一个整数数组 nums 和一个整数目标值 target，请你在该数组中找出和为目标值 target 的那两个整数，并返回它们的数组下标。

你可以假设每种输入只会对应一个答案，且同样的元素不能被重复利用。

你可以按任意顺序返回答案列表。

**示例 1：**
\`\`\`
输入：nums = [2,7,11,15], target = 9
输出：[0,1]
解释：因为 nums[0] + nums[1] == 9 ，返回 [0, 1] 。
\`\`\`

**示例 2：**
\`\`\`
输入：nums = [3,2,4], target = 6
输出：[1,2]
\`\`\``,
    difficulty: 'easy',
    language: 'JavaScript',
    starterCode: `function twoSum(nums, target) {
  // 在这里写你的代码

}`,
    solution: `function twoSum(nums, target) {
  const map = new Map();
  for (let i = 0; i < nums.length; i++) {
    const complement = target - nums[i];
    if (map.has(complement)) {
      return [map.get(complement), i];
    }
    map.set(nums[i], i);
  }
  return [];
}`,
    explanation: '使用哈希表存储已经遍历过的数字及其下标。对于每个元素，检查 target - current 是否在哈希表中。',
    tags: ['数组', '哈希表'],
  },
  {
    id: 'js-002',
    title: '有效的括号',
    description: `给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串 s，判断字符串是否有效。

有效字符串需满足：
1. 左括号必须用相同类型的右括号闭合。
2. 左括号必须以正确的顺序闭合。

**示例 1：**
\`\`\`
输入：s = "()"
输出：true
\`\`\`

**示例 2：**
\`\`\`
输入：s = "()[]{}"
输出：true
\`\`\`

**示例 3：**
\`\`\`
输入：s = "(]"
输出：false
\`\`\``,
    difficulty: 'easy',
    language: 'JavaScript',
    starterCode: `function isValid(s) {
  // 在这里写你的代码

}`,
    solution: `function isValid(s) {
  const stack = [];
  const map = {
    ')': '(',
    '}': '{',
    ']': '['
  };

  for (const char of s) {
    if (char in map) {
      if (stack.pop() !== map[char]) return false;
    } else {
      stack.push(char);
    }
  }

  return stack.length === 0;
}`,
    explanation: '使用栈来保存左括号。遇到右括号时，检查栈顶是否为对应的左括号。',
    tags: ['栈', '字符串'],
  },
  {
    id: 'js-003',
    title: '反转链表',
    description: `给你单链表的头节点 head，请你反转链表，并返回反转后的链表。

**示例 1：**
\`\`\`
输入：head = [1,2,3,4,5]
输出：[5,4,3,2,1]
\`\`\`

**示例 2：**
\`\`\`
输入：head = [1,2]
输出：[2,1]
\`\`\`

**示例 3：**
\`\`\`
输入：head = []
输出：[]
\`\`\``,
    difficulty: 'medium',
    language: 'JavaScript',
    starterCode: `// 定义链表节点
class ListNode {
  constructor(val = 0, next = null) {
    this.val = val;
    this.next = next;
  }
}

function reverseList(head) {
  // 在这里写你的代码

}`,
    solution: `function reverseList(head) {
  let prev = null;
  let current = head;

  while (current) {
    const next = current.next;
    current.next = prev;
    prev = current;
    current = next;
  }

  return prev;
}`,
    explanation: '使用三个指针：prev、current 和 next。迭代反转每个节点的指向。',
    tags: ['链表', '双指针'],
  },
  {
    id: 'js-004',
    title: '实现防抖函数',
    description: `实现一个防抖函数（debounce），返回一个新函数。

防抖函数的原理是：函数被调用后，需要等待一定的时间才会执行。如果在这段时间内函数再次被调用，则重新计时。

**示例：**
\`\`\`
const debouncedFn = debounce(fn, 1000);
debouncedFn(); // 开始计时
debouncedFn(); // 重新计时
// 1000ms 后 fn 才会被执行
\`\`\`

请实现 \`debounce\` 函数。`,
    difficulty: 'medium',
    language: 'JavaScript',
    starterCode: `function debounce(fn, delay) {
  // 在这里写你的代码

}`,
    solution: `function debounce(fn, delay) {
  let timer = null;

  return function (...args) {
    if (timer) clearTimeout(timer);
    timer = setTimeout(() => {
      fn.apply(this, args);
    }, delay);
  };
}`,
    explanation: '使用 timer 变量保存定时器ID。每次调用时清除之前的定时器，重新设置新的定时器。',
    tags: ['函数', '手写代码'],
  },
  {
    id: 'js-005',
    title: '实现节流函数',
    description: `实现一个节流函数（throttle），返回一个新函数。

节流函数的原理是：函数被调用后，在一定时间内只能执行一次。超出这段时间后才会重新可以执行。

**示例：**
\`\`\`
const throttledFn = throttle(fn, 1000);
throttledFn(); // 执行
throttledFn(); // 不执行
// 1000ms 后才能再次执行
\`\`\`

请实现 \`throttle\` 函数。`,
    difficulty: 'medium',
    language: 'JavaScript',
    starterCode: `function throttle(fn, delay) {
  // 在这里写你的代码

}`,
    solution: `function throttle(fn, delay) {
  let lastTime = 0;

  return function (...args) {
    const now = Date.now();
    if (now - lastTime >= delay) {
      lastTime = now;
      fn.apply(this, args);
    }
  };
}`,
    explanation: '使用 lastTime 记录上次执行时间。只有当当前时间与上次执行时间的差值大于等于 delay 时才执行。',
    tags: ['函数', '手写代码'],
  },
  {
    id: 'js-006',
    title: 'Promise.all 实现',
    description: `请手写实现 Promise.all 函数。

Promise.all 接收一个 Promise 实例的数组（或具有 Iterator 接口的对象），返回一个新的 Promise。

- 所有 Promise 都成功时，新 Promise 状态变为 resolved，返回所有 Promise 的结果数组
- 任何一个 Promise 失败时，新 Promise 状态变为 rejected，返回第一个失败的 Promise 的错误信息

**示例：**
\`\`\`
Promise.all([Promise.resolve(1), Promise.resolve(2)])
  .then(console.log); // [1, 2]

Promise.all([Promise.resolve(1), Promise.reject('error')])
  .catch(console.log); // 'error'
\`\`\``,
    difficulty: 'hard',
    language: 'JavaScript',
    starterCode: `function promiseAll(promises) {
  // 在这里写你的代码

}`,
    solution: `function promiseAll(promises) {
  return new Promise((resolve, reject) => {
    if (!Array.isArray(promises)) {
      return reject(new TypeError('参数必须是数组'));
    }

    const results = [];
    let completed = 0;

    if (promises.length === 0) {
      return resolve(results);
    }

    promises.forEach((promise, index) => {
      Promise.resolve(promise).then(
        value => {
          results[index] = value;
          completed++;
          if (completed === promises.length) {
            resolve(results);
          }
        },
        error => {
          reject(error);
        }
      );
    });
  });
}`,
    explanation: '遍历所有 Promise，使用计数器跟踪完成数量。注意要使用 Promise.resolve 处理非 Promise 值。',
    tags: ['Promise', '手写代码'],
  },
  // TypeScript 题目
  {
    id: 'ts-001',
    title: '实现泛型查询函数',
    description: `实现一个泛型函数 \`getProperty\`。

该函数接受一个对象和一个键名，返回对应键的值。如果键不存在，返回 \`undefined\`。

**示例：**
\`\`\`
interface User {
  name: string;
  age: number;
}

const user: User = { name: 'Tom', age: 25 };
getProperty(user, 'name'); // 'Tom'
getProperty(user, 'age'); // 25
getProperty(user, 'gender'); // undefined
\`\`\``,
    difficulty: 'easy',
    language: 'TypeScript',
    starterCode: `interface User {
  name: string;
  age: number;
}

function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] | undefined {
  // 在这里写你的代码

}

// 测试
const user: User = { name: 'Tom', age: 25 };
console.log(getProperty(user, 'name'));
console.log(getProperty(user, 'gender'));`,
    solution: `function getProperty<T, K extends keyof T>(obj: T, key: K): T[K] | undefined {
  return obj[key];
}`,
    explanation: '使用泛型 T 表示对象类型，泛型 K 必须是 T 的键。使用 keyof 获取对象的所有键。',
    tags: ['泛型', 'TypeScript'],
  },
  {
    id: 'ts-002',
    title: '实现 Partial 和 Required',
    description: `请手动实现 TypeScript 内置的 \`Partial\` 和 \`Required\` 类型。

- Partial<T>：将类型 T 的所有属性变为可选
- Required<T>：将类型 T 的所有属性变为必需

**示例：**
\`\`\`
interface Props {
  id: string;
  name: string;
  age: number;
}

type PartialProps = Partial<Props>;
// 等价于 { id?: string; name?: string; age?: number; }

type RequiredProps = Required<PartialProps>;
// 等价于 { id: string; name: string; age: number; }
\`\`\``,
    difficulty: 'medium',
    language: 'TypeScript',
    starterCode: `interface Props {
  id: string;
  name: string;
  age: number;
}

// 实现 MyPartial
type MyPartial<T> = {
  // 在这里实现
};

// 实现 MyRequired
type MyRequired<T> = {
  // 在这里实现
};

// 测试
type PartialProps = MyPartial<Props>;
type RequiredProps = MyRequired<PartialProps>;`,
    solution: `type MyPartial<T> = {
  [P in keyof T]?: T[P];
};

type MyRequired<T> = {
  [P in keyof T]-?: T[P];
};`,
    explanation: '使用映射类型（Mapped Types）。keyof T 获取所有键，in 遍历键，? 添加可选修饰符，-? 移除可选修饰符。',
    tags: ['类型系统', 'TypeScript'],
  },
  // Python 题目
  {
    id: 'py-001',
    title: '合并两个有序数组',
    description: `给你两个按 非递减顺序 排列的整数数组 nums1 和 nums2，另有两个整数 m 和 n 。

请你合并 nums2 到 nums1 中，使合并后的数组同样按 非递减顺序 排列。

注意：最终合并后返回排序后的数组，而不是返回哨兵数组。

**示例 1：**
\`\`\`
输入：nums1 = [1,2,3,0,0,0], m = 3, nums2 = [2,5,6], n = 3
输出：[1,2,2,3,5,6]
解释：需要合并 [1,2,3] 和 [2,5,6] 。
\`\`\`

**示例 2：**
\`\`\`
输入：nums1 = [1], m = 1, nums2 = [], n = 0
输出：[1]
\`\`\``,
    difficulty: 'easy',
    language: 'Python',
    starterCode: `def merge(nums1, m, nums2, n):
    """
    :type nums1: List[int]
    :type m: int
    :type nums2: List[int]
    :type n: int
    :rtype: None Do not return anything, modify nums1 in-place instead.
    """
    # 在这里写你的代码

    return nums1`,
    solution: `def merge(nums1, m, nums2, n):
    p1, p2 = m - 1, n - 1
    p = m + n - 1

    while p1 >= 0 and p2 >= 0:
        if nums1[p1] > nums2[p2]:
            nums1[p] = nums1[p1]
            p1 -= 1
        else:
            nums1[p] = nums2[p2]
            p2 -= 1
        p -= 1

    # 如果 nums2 还有剩余
    if p2 >= 0:
        nums1[:p2 + 1] = nums2[:p2 + 1]

    return nums1`,
    explanation: '从后向前遍历，使用双指针比较两个数组的元素，较大的放入 nums1 的末尾。',
    tags: ['数组', '双指针'],
  },
  {
    id: 'py-002',
    title: '实现LRU缓存',
    description: `请你设计并实现一个满足  LRU (最近最少使用) 缓存约束的数据结构。

实现 LRUCache 类：
- LRUCache(int capacity) 以正整数作为容量 capacity 初始化 LRU 缓存
- int get(int key) 如果关键字 key 存在于缓存中，则返回关键字的值，否则返回 -1 。
- void put(int key, int value) 如果关键字 key 已存在，则变更其数据值 value ；如果不存在，则插入键值对。当缓存容量达到 capacity 时，在插入新项之前，应该删除最久未使用的数据项。

**示例：**
\`\`\`
cache = LRUCache(2)
cache.put(1, 1)
cache.put(2, 2)
cache.get(1)    # 返回 1
cache.put(3, 3) # 该操作使 key=2 被删除
cache.get(2)    # 返回 -1
\`\`\``,
    difficulty: 'hard',
    language: 'Python',
    starterCode: `from collections import OrderedDict

class LRUCache:

    def __init__(self, capacity: int):
        # 在这里写你的代码
        pass

    def get(self, key: int) -> int:
        # 在这里写你的代码
        pass

    def put(self, key: int, value: int) -> None:
        # 在这里写你的代码
        pass`,
    solution: `from collections import OrderedDict

class LRUCache:
    def __init__(self, capacity: int):
        self.cache = OrderedDict()
        self.capacity = capacity

    def get(self, key: int) -> int:
        if key not in self.cache:
            return -1
        self.cache.move_to_end(key)
        return self.cache[key]

    def put(self, key: int, value: int) -> None:
        if key in self.cache:
            self.cache.move_to_end(key)
        self.cache[key] = value
        if len(self.cache) > self.capacity:
            self.cache.popitem(last=False)`,
    explanation: '使用 OrderedDict 有序字典，move_to_end 将访问的键移到末尾，popitem(last=False) 删除最前面的项。',
    tags: ['设计题', '哈希表'],
  },
  // Java 题目
  {
    id: 'java-001',
    title: '反转字符串',
    description: `编写一个函数，其作用是将输入的字符串反转过来。输入字符串以字符数组 s 的形式给出。

不要给另外的数组分配额外的空间，你必须原地修改输入数组、并在使用 O(1) 的额外空间的条件下解决问题。

**示例 1：**
\`\`\`
输入：s = ["h","e","l","l","o"]
输出：["o","l","l","e","h"]
\`\`\`

**示例 2：**
\`\`\`
输入：s = ["H","a","n","n","a","h"]
输出：["h","a","n","n","a","H"]
\`\`\``,
    difficulty: 'easy',
    language: 'Java',
    starterCode: `class Solution {
    public void reverseString(char[] s) {
        // 在这里写你的代码

    }
}`,
    solution: `class Solution {
    public void reverseString(char[] s) {
        int left = 0, right = s.length - 1;
        while (left < right) {
            char temp = s[left];
            s[left] = s[right];
            s[right] = temp;
            left++;
            right--;
        }
    }
}`,
    explanation: '使用双指针，从字符串两端交换字符，向中间移动。',
    tags: ['字符串', '双指针'],
  },
  {
    id: 'java-002',
    title: '实现单例模式',
    description: `实现一个单例类 Singleton，确保全局只有一个实例。

请实现以下两种方式：
1. 懒汉式（线程不安全）
2. 饿汉式（线程安全）

**要求：**
- 构造函数为 private
- 提供全局访问点 getInstance()`,
    difficulty: 'medium',
    language: 'Java',
    starterCode: `// 懒汉式（线程不安全）
class SingletonLazy {
    private static SingletonLazy instance;

    private SingletonLazy() {}

    public static SingletonLazy getInstance() {
        // 在这里写你的代码

        return instance;
    }
}

// 饿汉式（线程安全）
class SingletonHungry {
    private static SingletonHungry instance = new SingletonHungry();

    private SingletonHungry() {}

    public static SingletonHungry getInstance() {
        return instance;
    }
}`,
    solution: `// 懒汉式（线程不安全）
class SingletonLazy {
    private static SingletonLazy instance;

    private SingletonLazy() {}

    public static SingletonLazy getInstance() {
        if (instance == null) {
            instance = new SingletonLazy();
        }
        return instance;
    }
}

// 饿汉式（线程安全）
class SingletonHungry {
    private static SingletonHungry instance = new SingletonHungry();

    private SingletonHungry() {}

    public static SingletonHungry getInstance() {
        return instance;
    }
}

// 懒汉式（线程安全，使用 synchronized）
class SingletonSync {
    private static SingletonSync instance;

    private SingletonSync() {}

    public static synchronized SingletonSync getInstance() {
        if (instance == null) {
            instance = new SingletonSync();
        }
        return instance;
    }
}`,
    explanation: '懒汉式：首次使用时创建，需要加锁保证线程安全。饿汉式：类加载时就创建，天然线程安全。',
    tags: ['设计模式', 'Java'],
  },
  // Go 题目
  {
    id: 'go-001',
    title: '实现并发安全的计数器',
    description: `使用 Go 的 goroutine 和 channel 实现一个并发安全的计数器。

要求：
1. 创建一个结构体 Counter
2. 提供 Add 方法用于增加计数
3. 提供 Get 方法用于获取当前计数
4. 使用 mutex 保证线程安全`,
    difficulty: 'medium',
    language: 'Go',
    starterCode: `package main

import (
	"sync"
)

type Counter struct {
	// 在这里定义字段

}

// Add 增加计数
func (c *Counter) Add(n int) {
	// 在这里写你的代码

}

// Get 获取当前计数
func (c *Counter) Get() int {
	// 在这里写你的代码

	return 0
}

func main() {
	// 测试
	var wg sync.WaitGroup
	counter := Counter{}

	for i := 0; i < 1000; i++ {
		wg.Add(1)
		go func() {
			defer wg.Done()
			counter.Add(1)
		}()
	}

	wg.Wait()
	println(counter.Get()) // 应该输出 1000
}`,
    solution: `package main

import (
	"sync"
)

type Counter struct {
	count int
	mu    sync.Mutex
}

func (c *Counter) Add(n int) {
	c.mu.Lock()
	defer c.mu.Unlock()
	c.count += n
}

func (c *Counter) Get() int {
	c.mu.Lock()
	defer c.mu.Unlock()
	return c.count
}`,
    explanation: '使用 sync.Mutex 保护共享资源。Lock() 加锁，Unlock() 解锁，使用 defer 确保解锁。',
    tags: ['并发', 'Go'],
  },
  {
    id: 'go-002',
    title: '实现 worker pool',
    description: `使用 Go 实现一个 Worker Pool。

Worker Pool 的工作原理：
1. 创建一组 worker goroutine
2. 通过 channel 发送任务给 workers
3. Workers 处理任务并返回结果
4. 主 goroutine 收集结果

请实现一个简单的 worker pool：`,
    difficulty: 'hard',
    language: 'Go',
    starterCode: `package main

import (
	"fmt"
	"time"
)

func worker(id int, jobs <-chan int, results chan<- int) {
	// 在这里写你的代码

}

func main() {
	jobs := make(chan int, 100)
	results := make(chan int, 100)

	// 启动 3 个 workers
	for w := 1; w <= 3; w++ {
		go worker(w, jobs, results)
	}

	// 发送 9 个任务
	for j := 1; j <= 9; j++ {
		jobs <- j
	}
	close(jobs)

	// 收集结果
	for r := 1; r <= 9; r++ {
		fmt.Println(<-results)
	}
}`,
    solution: `package main

import (
	"fmt"
	"time"
)

func worker(id int, jobs <-chan int, results chan<- int) {
	for job := range jobs {
		fmt.Printf("worker %d processing job %d\\n", id, job)
		time.Sleep(time.Millisecond * 500)
		results <- job * 2
	}
}

func main() {
	jobs := make(chan int, 100)
	results := make(chan int, 100)

	// 启动 3 个 workers
	for w := 1; w <= 3; w++ {
		go worker(w, jobs, results)
	}

	// 发送 9 个任务
	for j := 1; j <= 9; j++ {
		jobs <- j
	}
	close(jobs)

	// 收集结果
	for r := 1; r <= 9; r++ {
		fmt.Println(<-results)
	}
}`,
    explanation: '使用无缓冲或带缓冲的 channel。workers 从 jobs channel 接收任务，处理后发送到 results channel。',
    tags: ['并发', 'Go'],
  },
  // C++ 题目
  {
    id: 'cpp-001',
    title: '实现智能指针',
    description: `请实现一个简单的引用计数智能指针 \`SmartPtr\`。

要求：
1. 模板类，支持任意类型
2. 内部维护引用计数
3. 拷贝构造和赋值时引用计数+1
4. 析构时引用计数-1，为0时删除对象
5. 提供 \`get()\` 和 \`use_count()\` 方法`,
    difficulty: 'hard',
    language: 'C++',
    starterCode: `template<typename T>
class SmartPtr {
private:
    T* ptr;
    // 在这里添加引用计数

public:
    explicit SmartPtr(T* p = nullptr) {
        // 在这里写你的代码

    }

    ~SmartPtr() {
        // 在这里写你的代码

    }

    // 拷贝构造
    SmartPtr(const SmartPtr& other) {
        // 在这里写你的代码

    }

    // 赋值操作符
    SmartPtr& operator=(const SmartPtr& other) {
        // 在这里写你的代码

        return *this;
    }

    T& operator*() { return *ptr; }
    T* operator->() { return ptr; }

    T* get() { return ptr; }
    int use_count() { return 0; } // 修改这里
};`,
    solution: `template<typename T>
class SmartPtr {
private:
    T* ptr;
    int* count;

public:
    explicit SmartPtr(T* p = nullptr) : ptr(p), count(new int(1)) {}

    ~SmartPtr() {
        if (--(*count) == 0) {
            delete ptr;
            delete count;
        }
    }

    SmartPtr(const SmartPtr& other) : ptr(other.ptr), count(other.count) {
        (*count)++;
    }

    SmartPtr& operator=(const SmartPtr& other) {
        if (this != &other) {
            if (--(*count) == 0) {
                delete ptr;
                delete count;
            }
            ptr = other.ptr;
            count = other.count;
            (*count)++;
        }
        return *this;
    }

    T& operator*() { return *ptr; }
    T* operator->() { return ptr; }

    T* get() { return ptr; }
    int use_count() { return *count; }
};`,
    explanation: '使用指针管理引用计数。拷贝/赋值时计数+1，析构时计数-1，为0时释放资源。',
    tags: ['智能指针', 'C++'],
  },
  // Rust 题目
  {
    id: 'rust-001',
    title: '实现 ownership 转移',
    description: `Rust 中的 ownership 是一个核心概念。

请实现一个函数 \`consume\` 和 \`clone_and_consume\`，展示 ownership 的转移和克隆。

**要求：**
1. consume 函数接收 String，消耗它并打印
2. clone_and_consume 函数克隆后消耗原值和克隆值`,
    difficulty: 'easy',
    language: 'Rust',
    starterCode: `fn main() {
    let s1 = String::from("hello");
    consume(s1);
    // 这里 s1 已经不可用了

    let s2 = String::from("world");
    clone_and_consume(s2);
    // 这里 s2 也不可用了
}

fn consume(s: String) {
    // 在这里实现，打印 s

}

fn clone_and_consume(s: String) {
    // 在这里实现：克隆 s，然后消耗原 s 和克隆

}`,
    solution: `fn main() {
    let s1 = String::from("hello");
    consume(s1);
    // 这里 s1 已经不可用了

    let s2 = String::from("world");
    clone_and_consume(s2);
    // 这里 s2 也不可用了
}

fn consume(s: String) {
    println!("{}", s);
}

fn clone_and_consume(s: String) {
    let s_clone = s.clone();
    println!("Original: {}", s);
    println!("Clone: {}", s_clone);
}`,
    explanation: 'Rust 中 ownership 可以转移（move）或克隆（clone）。转移后原变量不可用，克隆后两者都可用。',
    tags: ['Ownership', 'Rust'],
  },
  {
    id: 'rust-002',
    title: '实现 Result 错误处理',
    description: `实现一个除法函数，返回 Result 类型。

- 成功返回 Ok(商)
- 除数为零返回 Err("Division by zero")`,
    difficulty: 'easy',
    language: 'Rust',
    starterCode: `fn divide(a: i32, b: i32) -> Result<i32, String> {
    // 在这里实现

}

fn main() {
    match divide(10, 2) {
        Ok(result) => println!("10 / 2 = {}", result),
        Err(e) => println!("Error: {}", e),
    }

    match divide(10, 0) {
        Ok(result) => println!("10 / 0 = {}", result),
        Err(e) => println!("Error: {}", e),
    }
}`,
    solution: `fn divide(a: i32, b: i32) -> Result<i32, String> {
    if b == 0 {
        Err("Division by zero".to_string())
    } else {
        Ok(a / b)
    }
}`,
    explanation: '使用 Result<T, E> 类型处理错误。Ok 表示成功，Err 表示错误。',
    tags: ['错误处理', 'Rust'],
  },
];

// AI面试问题库
export const aiTechnicalQuestions: AIQuestion[] = [
  {
    id: 'tech-001',
    question: '请自我介绍一下吧',
    category: '开场',
    tips: '简明扼要，突出技术背景和经验',
  },
  {
    id: 'tech-002',
    question: '请介绍一下你最近做的一个项目',
    category: '项目经验',
    tips: '说明项目背景、你的职责、遇到的技术挑战和解决方案',
  },
  {
    id: 'tech-003',
    question: '你最有成就感的技术成就是什么？',
    category: '个人成就',
    tips: '描述具体问题、解决方案和结果',
  },
  {
    id: 'tech-004',
    question: '你如何学习新技术？',
    category: '学习方法',
    tips: '展示你的学习能力和方法论',
  },
  {
    id: 'tech-005',
    question: '你遇到过最难的技术问题是什么？如何解决的？',
    category: '问题解决',
    tips: '展示问题分析和解决能力',
  },
  {
    id: 'tech-006',
    question: '请解释一下什么是闭包？',
    category: '编程概念',
    tips: '给出准确定义和示例',
  },
  {
    id: 'tech-007',
    question: '什么是 HTTPS？它是如何保证安全的？',
    category: '网络',
    tips: '解释 SSL/TLS 握手过程',
  },
  {
    id: 'tech-008',
    question: '请解释一下什么是 Promise？',
    category: '异步编程',
    tips: '说明状态和用法',
  },
  {
    id: 'tech-009',
    question: '你了解哪些设计模式？请举例说明',
    category: '设计模式',
    tips: '列举常用模式并说明应用场景',
  },
  {
    id: 'tech-010',
    question: '请解释一下什么是 RESTful API？',
    category: '后端',
    tips: '说明原则和最佳实践',
  },
];

export const aiBehavioralQuestions: AIQuestion[] = [
  {
    id: 'beh-001',
    question: '请介绍一下你自己',
    category: '开场',
    tips: '简明扼要，突出优势',
  },
  {
    id: 'beh-002',
    question: '为什么想加入我们公司？',
    category: '动机',
    tips: '展示对公司了解和个人匹配度',
  },
  {
    id: 'beh-003',
    question: '你的职业规划是什么？',
    category: '职业规划',
    tips: '展示长期思考和目标',
  },
  {
    id: 'beh-004',
    question: '你最大的优点和缺点是什么？',
    category: '自我认知',
    tips: '诚实但要展示改进',
  },
  {
    id: 'beh-005',
    question: '你如何在团队中处理冲突？',
    category: '团队协作',
    tips: '展示沟通和问题解决能力',
  },
  {
    id: 'beh-006',
    question: '请描述一次你失败的经历',
    category: '抗压能力',
    tips: '展示从失败中学习和成长',
  },
  {
    id: 'beh-007',
    question: '你为什么离职？',
    category: '离职原因',
    tips: '积极正面，避免负面',
  },
  {
    id: 'beh-008',
    question: '你期望的薪资是多少？',
    category: '薪资期望',
    tips: '基于市场和个人价值',
  },
  {
    id: 'beh-009',
    question: '你有什么问题想问我吗？',
    category: '结尾',
    tips: '准备有深度的问题',
  },
  {
    id: 'beh-010',
    question: '你还需要补充什么吗？',
    category: '结尾',
    tips: '总结优势，表达诚意',
  },
];

export const languages = ['JavaScript', 'TypeScript', 'Python', 'Java', 'Go', 'C++', 'Rust'] as const;
export const difficulties = ['easy', 'medium', 'hard'] as const;
